import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
// post request --> transaction ID
// from transactionID get sellerID, get ticket_listing, pay user amount

export async function POST(request, response){
    const body = await request.text();
    console.log("event", body)
    const sig = request.headers.get('stripe-signature');
    console.log("sig", sig);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET);
      } 
    catch (err) {
        console.log("error occurred?")
        // response.status(400).send(`Webhook Error: ${err.message}`);
        return NextResponse.json({message : `Webhook Error: ${err.message}`}, {status : 400});
      }
      switch (event.type) {
        case 'payment_intent.succeeded':
        case 'charge.succeeded':

        const paymentIntentSucceeded = event.data.object;
        const {id} = paymentIntentSucceeded
        console.log(id)


        try {
            const paymentIntent =  await stripe.paymentIntents.retrieve(id);
              const {listingID, buyerID, paymentMethod} = paymentIntent.metadata;
              console.log("payment create");
              console.log(paymentMethod)
              await payUser(listingID, buyerID, paymentMethod);
        } catch (error) {
          return NextResponse.json({message : "transaction failed"}, {status : 400});
        }
    }
}

const payUser = async (listingID, buyerID, paymentMethod) => {
    const prisma = new PrismaClient();

    // find seller from listing
    const { userID : sellerId, ticketID, price, quantity} = await prisma.ticketlisting.findUnique({
        where : {
            listingID : listingID,
        },
        select : {
            userID : true,
            ticketID : true,
            price : true,
            quantity : true,
        }
    })
    

    // create transaction
    const { transactionID } = await prisma.transaction.create({
        data : {
            date : new Date().toISOString(),
            buyerID : buyerID,
            sellerID : sellerId,
            ticketID : ticketID
        }
    })

    // create payment
    const { paymentID } = await prisma.payment.create({
        data : {
            isSuccessful : 1,
            paymentMethod : paymentMethod,
            orderID : null,
            transactionID : transactionID,
        }
    })

    // find user bank account
    const { stripeUserID } = await prisma.user.findUnique({
        where : {
            userID : sellerId,
        },
        select : {
            stripeUserID : true,
        },
    })

    // transfer of tickets
    // havent implement

    // initiate payout
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    try {
        // Fetch the account balance to determine the available funds
        const balance = await stripe.balance.retrieve();
        // This demo app only uses USD so we'll just use the first available balance
        // (Note: there is one balance for each currency used in your application)
        const {amount} = balance.available[0];
        if(price > amount){
            return NextResponse.json({"message" : "error insufficient balance"}, { 
                status: 400, 
            })
        }
        // Create a payout
        console.log(price, stripeUserID)
        const transfer = await stripe.transfers.create({
            amount: (price * quantity),
            currency: "SGD",
            destination: stripeUserID,
          });
          console.log(transfer)
      } catch (err) {
        console.log(err);
        return NextResponse.json({"message" : "payout failed"}, { 
            status: 400, 
        })
      }

    return NextResponse.json({"message" : "successfully paid"}, { 
        status: 200, 
    })
}