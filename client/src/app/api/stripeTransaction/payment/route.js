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
    const { ticketID, price, quantity, marketplaceID } = await prisma.ticketlisting.findUnique({
        where : {
            listingID : listingID,
        },
        select : {
            ticketID : true,
            price : true, 
            quantity : true,
            marketplaceID : true,
        }
    })

    await prisma.marketplace.findUnique({
        where : {
            marketplaceID : marketplaceID,
        },
        select : {
            run
        }
    })

    // find seat
    const { seatID } = await prisma.ticket.findUnique({
        where : {
            ticketID : ticketID,
        },
        select : {
            seatID : true,
        }
    })

    // get seat details
    const {seatRow, seatNo} = await prisma.seat.findUnique({
        where : {
            seatID : seatID,
        },
        select : {
            seatRow : true,
            seatNo : true,
        }
    })


    // find eventDetails
    const { name, displayImage } = await prisma.event.findUnique({
        where : {
            eventID : eventID,
        },
        select : {
            name : true,
            displayImage : true, 
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
                        images : [displayImage],
                        description : `Date: ${date.toLocaleDateString()} Time: ${startTime} Venue: ${venue} 
                         Category: ${category}\n${seatDesc}`,
                    },
                },
                quantity : 1,
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
