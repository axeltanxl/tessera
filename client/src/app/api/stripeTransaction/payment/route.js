import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authenticated } from "../../ProtectRoutes";
import jwt_decode from "jwt-decode";

export async function POST(request){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const { jwt, paymentMethod, listingID } = await request.json();
    console.log("jwt:", jwt);
    
   
    const decoded = jwt_decode(jwt);
    const email = decoded.sub

    // find the buyer
    const { userID } = await prisma.user.findFirst({
        where : {
            email : email 
        },
        select : {
            userID : true,
        }
    })

    // find listing
    const { price, quantity, eventID, runID } = await prisma.ticketlisting.findUnique({
        where : {
            listingID : listingID,
        },
        select : {
            price : true, 
            quantity : true,
            eventID : true,
            runID : true,
        }
    })

    // find eventDetails
    const { name, displayImage } = await prisma.event.findUnique({
        where : {
            eventID : eventID,
        },
        select : {
            name : true,
        }
    })




    // console.log("decoded userid:" , userID);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
    // stripe checkout session 
    console.log("metadata");
    console.log(userID, paymentMethod)
    const session = await stripe.checkout.sessions.create({
        line_items : [
            {
                price_data : {
                    currency : "sgd",
                    unit_amount : price,
                    product_data :{
                        name : name,
                        images : [displayImage]
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
                listingID: listingID,
                buyerID : userID,
                paymentMethod : paymentMethod,
            },
        }
    })

    const out = JSON.stringify({webUrl :session.url});
    return new NextResponse(out, { 
        status: 200, 
        headers: { "Content-Type": "application/json" },
       })

}
