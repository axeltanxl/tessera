import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authenticated } from "../ProtectRoutes";
import jwt_decode from "jwt-decode";

// npx prisma db pull
// npx prisma migrate dev



export async function POST(request){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const { jwt, runID, quantity, category, paymentMethod, seatIDs} = await request.json();
    console.log("jwt:", jwt);
    console.log(seatIDs)

    if(!seatIDs || seatIDs.length !== quantity){
        return NextResponse.json({ message: 'insufficient seats' }, { status: 400 });
    }
    // get run 
    const { eventID, startTime, date } = await prisma.run.findUnique({
        where : {
            runID : runID,
        },
        select : {
            eventID : true,
            startTime : true,
            date : true,
        }
    })

    // get price per category
    const {pricePerCategory, venueID} = await prisma.event.findUnique({
        where : {
            eventID : eventID
        },
        select : {
            pricePerCategory : true,
            venueID: true,
        }
    })

    // get venue
    const { name : venue } = await prisma.venue.findUnique({
        where : {
            venueID : venueID,
        },
        select : {
            name : true,
        }
    })

    const pricePerCat = JSON.parse(pricePerCategory);
    const unitPrice =  pricePerCat[category];
    const decoded = jwt_decode(jwt);
    const email = decoded.sub

    // get user
    const { userID } = await prisma.user.findFirst({
        where : {
            email : email 
        },
        select : {
            userID : true,
        }
    })

    // get event
    const { name , displayImage} = await prisma.event.findUnique({
        where : {
            eventID : eventID,
        },
        select : {
            name : true,
            displayImage : true, 
        }
    })

    const { orderID } = await prisma.custorder.create({
        data: {
            ticketCategory: category,
            ticketQuantity: quantity,
            date : new Date().toISOString(),
            runID : runID,
            userID : userID,
            price : (unitPrice * quantity),
        },
      })
    
    const seats = await prisma.seat.findMany({
        where : {
            seatID : { in: seatIDs },
        },
        select : {
            seatRow : true,
            seatNo : true,
        }
    })
    const seatDescription = seats.map(seat => {
        return `Row: ${seat.seatRow}, Seat: ${seat.seatNo} `
    })
    const seatDesc = seatDescription.join("\n");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // stripe checkout session 

    console.log("seatDescription");
    console.log(seatDesc)
    
    const { url, id : sessionID } = await stripe.checkout.sessions.create({
        line_items : [
            {
                price_data : {
                    currency : "sgd",
                    unit_amount : unitPrice,
                    product_data :{
                        name : name,
                        images : [displayImage ?? "https://crawfordroofing.com.au/wp-content/uploads/2018/04/No-image-available-2.jpg"],
                        description : `Date: ${date.toLocaleDateString()} Time: ${startTime} Venue: ${venue} 
                         Category: ${category}\n${seatDesc}`,
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
                paymentReason : "purchase", 
                userID : userID,
                seats : JSON.stringify(seatIDs),
                orderId : orderID,
                paymentMethod : paymentMethod,
            },
        },
    })

    // update cust order with the session id
    await prisma.custorder.update({
        where : {
            orderID : orderID,
        },
        data : {
            stripeOrderID : sessionID
        }
    })


    const out = {
        webUrl : url,
        paymentMethod : paymentMethod,
        orderId : orderID
    }
    const json = JSON.stringify(out , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    return new NextResponse(json, { 
        status: 201, 
        headers: { "Content-Type": "application/json" },
       })

}
