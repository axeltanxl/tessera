import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import CryptoJS from 'crypto-js'

export async function GET(request, response){
    return NextResponse.json({message : "CORRECT LINK"}, {status : 200});
}

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
            const {paymentReason, userID, seats, orderId, paymentMethod} = paymentIntent.metadata;
            const seatIDs = JSON.parse(seats);
            console.table(paymentIntent.metadata);
            if(paymentReason === "purchase"){
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
                paymentMethod : paymentMethod,
                orderID : orderId,
                transactionID : null,
                stripePaymentID : id,
              },
          })

        const {runID} =  await prisma.custorder.findUnique({
            where : {
                orderID : orderId,
            },
            select : {
                runID : true,
            }
        })

        // create ticket for each seat
        for (let seat in seatIDs){
            const uniqueJson = {
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
                    userID : userID,
                    uniqueCode : ticketUniqueCode,
                },
            })
        }
}

