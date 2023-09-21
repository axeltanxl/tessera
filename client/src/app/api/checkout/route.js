import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authenticated } from "../ProtectRoutes";
// npx prisma db pull
// npx prisma migrate dev

// export async function POST(request){
//     const prisma = new PrismaClient();
//     const { eventID, quantity, category } = await request.json();
//     // console.log("body: ", eventID, "qty", quantity, "category", category);
//     const {pricePerCategory} = await prisma.event.findUnique({
//         where : {
//             eventID : eventID
//         },
//         select : {
//             pricePerCategory : true,
//         }
//     })
//     const pricePerCat = JSON.parse(pricePerCategory);
//     const unitPrice =  pricePerCat[category];
//     const totalPrice = Number(unitPrice) * Number(quantity);

//     console.log("total: ", totalPrice);

//     const json = JSON.stringify({totalPrice : totalPrice} , (key, value) => {
//         return typeof value === 'bigint' ? value.toString() : value;
//     });

//     return new NextResponse(json, { 
//      status: 201, 
//      headers: { "Content-Type": "application/json" },
//     });

// }


export async function POST(request){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const { eventID, quantity, category, images } = await request.json();
    console.log("pricePerCategory:", eventID);
    const {pricePerCategory} = await prisma.event.findUnique({
        where : {
            eventID : eventID
        },
        select : {
            pricePerCategory : true,
        }
    })
    const pricePerCat = JSON.parse(pricePerCategory);
    const unitPrice =  pricePerCat[category];
    

   
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
    // stripe checkout session 
    const session = await stripe.checkout.sessions.create({
        line_items : [
            {
                price_data : {
                    currency : "sgd",
                    unit_amount : unitPrice,
                    product_data :{
                        name : "example_product",
                        images : [images]
                    },
                },
                quantity : quantity
            }
        ],
        mode : 'payment', // one time payment
        success_url : "http://localhost:3000/paymentFeedback/success",
        cancel_url : "http://localhost:3000/paymentFeedback/cancel"
    })
    return NextResponse.json(session.url)

}
