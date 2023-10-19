import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticated } from "../../ProtectRoutes";
import Stripe from "stripe";

export async function POST(request, response){
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    let event;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prisma = new PrismaClient();

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
          const paymentIntent =  await stripe.paymentIntents.retrieve(id);
          const { paymentReason } = paymentIntent.metadata;

          try {
              if(paymentReason === "purchase"){
                    const { userID, seats, orderId, paymentMethod } = paymentIntent.metadata;
                    const seatIDs = JSON.parse(seats);
                    console.table(paymentIntent.metadata);
                    createPaymentForPurchase(prisma,id, userID, seatIDs, orderId, paymentMethod)
                }
          } catch (error) {
            return NextResponse.json({message : "no order created "}, {status : 400});
          }
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    return NextResponse.json({message : "success yayy"}, {status : 200});
}













const createPaymentForPurchase = async (prisma,id, userID, seatIDs, orderId, paymentMethod) => {
    // create payment success
    await prisma.payment.create({
        data: {
            isSuccessful : 1,
            paymentMethod : paymentMethod,
            orderID : orderId,
            transactionID : null,
            stripePaymentID : id,
          },
      })

    const {eventID, runID} =  await prisma.custorder.findUnique({
        where : {
            orderID : orderId,
        },
        select : {
            eventID : true,
            runID : true,
        }
    })

    // create ticket for each seat
    for (let seat in seatIDs){
        const uniqueJson = {
            orderId : orderId,
            eventID : eventID,
            userID : userID,
            runID : runID,
            seatID : seat,
        }
        const ticketUniqueCode = CryptoJS.AES.encrypt(
            JSON.stringify(uniqueJson , (key, value) => {return typeof value === 'bigint' ? value.toString() : value;}),
            process.env.QR_SECRET_KEY1)
            .toString();

        await prisma.ticket.create({
            data : {
                orderID : orderId,
                seatID : seat,
                user : userID,
                uniqueCode : ticketUniqueCode,
            },
        })
    }
}


