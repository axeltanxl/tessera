// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { authenticated } from "../../ProtectRoutes";
// import Stripe from "stripe";

// export async function GET(request, response){
//     return NextResponse.json({message : "CORRECT LINK"}, {status : 200});
// }

// export async function POST(request, response){
//     const body = await request.text();
//     const sig = request.headers.get('stripe-signature');
//     let event;

//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const prisma = new PrismaClient();

//     try {
//         event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET);
//       } 
//     catch (err) {
//         console.log("error occurred?")
//         return NextResponse.json({message : `Webhook Error: ${err.message}`}, {status : 400});
//       }
    
//     switch (event.type) {
        
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       const {id} = paymentIntentSucceeded
//       console.log(id)
//       try {
//           const paymentIntent =  await stripe.paymentIntents.retrieve(id);
//             const {orderId, paymentMethod} = paymentIntent.metadata;
//            // console.log(paymentIntent)
//             console.log("payment create");
//             console.log(orderId);
//             console.log(paymentMethod)

          
//           await prisma.payment.create({
//               data: {
//                   isSuccessful : 1,
//                   paymentMethod : paymentMethod,
//                   orderID : orderId,
//                   transactionID : null,
//                 },
//             })
//       } catch (error) {
//         return NextResponse.json({message : "no order created "}, {status : 400});
//       }
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }


//     return NextResponse.json({message : "success yayy"}, {status : 200});
// }