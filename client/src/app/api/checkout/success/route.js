import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticated } from "../../ProtectRoutes";
import { buffer } from "micro";
import Stripe from "stripe";

export async function GET(request, response){
    return NextResponse.json({message : "CORRECT LINK"}, {status : 200});
}

export async function POST(request, response){
    console.log("endpoint called")
    // console.log(sig)
    // const rawBody = await buffer(request);
    // const body = JSON.parse(rawBody.toString());
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
          const paymentIntentSucceeded = event.data.object;
        //   console.log(paymentIntentSucceeded);
          const {id} = paymentIntentSucceeded
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
          case 'charge.succeeded':
            const chargeSucceeded = event.data.object;
            const { payment_method_details } = chargeSucceeded
            // here should also destructure orderId metadata passed
            const orderId = 69;

            console.log(payment_method_details.type);
            await prisma.payment.create({
                data: {
                    isSuccessful : 1,
                    paymentMethod : payment_method_details.type,
                    orderId : orderId,
                },
            })
            // await prisma.ticket.create({
            // //     data: {
            // //         eventDate : "date",
            // //         uniqueCode : qrCode,
            // //         seatID : seatID, 
            // //     },
            // // })
            break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    
      // Return a 200 response to acknowledge receipt of the event
    //   response.send();
    return NextResponse.json({message : "success yayy"}, {status : 200});
    console.log("success")
    // if(!authenticated){
    //     return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    // }
    // const body = await request.json();
    // console.log(body);
    // const { paymentMethod, orderId } = body;

    // const prisma = new PrismaClient();
    // console.log("payment method:", paymentMethod, orderId);
    // await prisma.payment.create({
    //     data: {
    //         isSuccessful : 1,
    //         paymentMethod : paymentMethod,
    //         orderId : orderId,
    //     },
    // })
    // // await prisma.ticket.create({
    // //     data: {
    // //         eventDate : "date",
    // //         uniqueCode : qrCode,
    // //         seatID : seatID, 
    // //     },
    // // })
    // return NextResponse.json({message : "successful reserved"}, {status : 201});
}


// TicketID
// EventDate
// UniqueCode
// SeatID (FK)
