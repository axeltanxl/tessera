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
    const { ticketID, price, runID, userID : sellerID } = await prisma.ticketlisting.findUnique({
        where : {
            listingID : listingID,
        },
        select : {
            ticketID : true,
            price : true, 
            quantity : true,
            marketplaceID : true,
            runID : true, 
            userID : true,
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
    const {seatRow, seatNo, category, venueID} = await prisma.seat.findUnique({
        where : {
            seatID : seatID,
        },
        select : {
            seatRow : true,
            seatNo : true,
            category : true,
            venueID : true,
        }
    })

    // get venue name
    const {name : venue} = await prisma.venue.findUnique({
        where : {
            venueID : venueID,
        },
        select : {
            name : true,
        }
    })

    // find run
    const {eventID, date, startTime} = await prisma.run.findUnique({
        where : {
            runID : runID,
        },
        select : {
            eventID : true,
            date : true,
            startTime : true,
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
                        images : [displayImage ?? "https://crawfordroofing.com.au/wp-content/uploads/2018/04/No-image-available-2.jpg"],
                        description : `Date: ${date.toLocaleDateString()} Time: ${startTime} Venue: ${venue} 
                         Category: ${category}\n${`Row: ${seatRow}, Seat: ${seatNo} `}`,
                    },
                },
                quantity : 1,
            }
        ],
        mode : 'payment', // one time payment
        success_url : `${process.env.NEXTAUTH_URL}/paymentFeedback/success`,
        cancel_url : `${process.env.NEXTAUTH_URL}/paymentFeedback/cancel`,
        payment_intent_data : {
            metadata : {
                paymentReason : "transaction",
                listingID: listingID,
                buyerID : userID,
                seatID : seatID,
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
