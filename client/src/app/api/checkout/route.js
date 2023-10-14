import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authenticated } from "../ProtectRoutes";
import jwt_decode from "jwt-decode";

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
    const { name, jwt, eventID, quantity, category, images, paymentMethod } = await request.json();
    console.log("jwt:", jwt);
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
    const decoded = jwt_decode(jwt);
    const email = decoded.sub
    const { userID } = await prisma.user.findFirst({
        where : {
            email : email 
        },
        select : {
            userID : true,
        }
    })
    // console.log("decoded userid:" , userID);

    const res = await prisma.custorder.create({
        data: {
            ticketCategory: category,
            ticketQuantity: quantity,
            eventID : eventID,
            userID : userID,
            price : (unitPrice * quantity),
        },
      })
    // orderID
    // ticketCategory
    // ticketQuantity
    // eventID 
    // userID 

    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
    // stripe checkout session 
    console.log("metadata");
    console.log(res.orderID, paymentMethod)
    const session = await stripe.checkout.sessions.create({
        line_items : [
            {
                price_data : {
                    currency : "sgd",
                    unit_amount : unitPrice,
                    product_data :{
                        name : name,
                        images : [images]
                    },
                },
                quantity : quantity
            }
        ],
        mode : 'payment', // one time payment
        success_url : "http://localhost:3000/paymentFeedback/success",
        cancel_url : "http://localhost:3000/paymentFeedback/cancel",
        payment_intent_data : {
            metadata : {
                orderId : res.orderID,
                paymentMethod : paymentMethod,
            },
        }
    })

    const out = {
        webUrl :session.url,
        paymentMethod : paymentMethod,
        orderId : res.orderID
    }
    const json = JSON.stringify(out , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    return new NextResponse(json, { 
        status: 201, 
        headers: { "Content-Type": "application/json" },
       })

}
