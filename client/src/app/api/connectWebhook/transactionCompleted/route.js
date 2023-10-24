import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import CryptoJS from 'crypto-js'

// post request --> transaction ID
// from transactionID get sellerID, get ticket_listing, pay user amount

export async function POST(request, response){
    const prisma = new PrismaClient();
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET);
      } 
    catch (err) {
        console.log("error occurred?")
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
            const { paymentReason } = paymentIntent.metadata;
            if(paymentReason === "transaction"){
                    const {listingID, buyerID, seatID, paymentMethod} = paymentIntent.metadata;
                    console.table(paymentIntent.metadata);
                    payUser(prisma, id, listingID, buyerID, paymentMethod, seatID);
                }
        } catch (error) {
          return NextResponse.json({message : "transaction failed"}, {status : 400});
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
        }
    return NextResponse.json({message : "success yayy"}, {status : 200});
}

const payUser = async (prisma, id, listingID, buyerID, paymentMethod, seatID) => {
    // find seller from listing
    console.log("why")
    const { userID : sellerId, ticketID, price, marketplaceID} = await prisma.ticketlisting.findUnique({
        where : {
            listingID : listingID,
        },
        select : {
            userID : true,
            ticketID : true,
            price : true,
            marketplaceID : true,
            // quantity : true,
        }
    })
    
    console.log("seller:", sellerId)
    console.log("ticket", ticketID)
    console.log("price",price)
    console.log("marketplaceID",marketplaceID);
    
    const {runID} = await prisma.run.findUnique({
        where : {
            marketplaceID : marketplaceID,
        },
        select : {
            runID : true
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
            paymentMethod : paymentMethod,
            orderID : null,
            transactionID : transactionID,
            stripePaymentID : id,
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

    const uniqueJson = {
        userID : buyerID,
        runID : runID,
        seatID : seatID,
    }
    
    // transfer of tickets
    const ticketUniqueCode = CryptoJS.AES.encrypt(
        JSON.stringify(uniqueJson , (key, value) => {return typeof value === 'bigint' ? value.toString() : value;}),
        process.env.QR_SECRET_KEY1)
        .toString();
    // havent implement
    await prisma.ticket.update({
        where : {
            ticketID : ticketID,
        },
        data : {
            userID : buyerID,
            uniqueCode : ticketUniqueCode,
        }
    })

    // initiate payout
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
        const balance = await stripe.balance.retrieve();

        const {amount} = balance.available[0];
        console.log("amount", amount)

        if(price > amount){
            return NextResponse.json({"message" : "error insufficient balance"}, { 
                status: 400, 
            })
        }
        // Create a payout
        console.log(price, stripeUserID)
        const transfer = await stripe.transfers.create({
            amount: price ,
            currency: "SGD",
            destination: stripeUserID,
          });
          console.log(transfer)
      }