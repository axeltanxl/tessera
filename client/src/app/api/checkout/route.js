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
    
    let seatDesc = "";
    const listRunSeat = [];

    for(let seatID of seatIDs){
        const { seatRow, seatNo } = await prisma.seat.findUnique({
            where : {
                seatID :  seatID,
            },
            select : {
                seatRow : true,
                seatNo : true,
            }
        })
        seatDesc += `Row: ${seatRow}, Seat: ${seatNo}`

        const { runSeatID, isAvailable } = await prisma.runseat.findFirst({
            where : {
                seatID : seatID,
                runID : runID,
            },
            select : {
                runSeatID : true,
                isAvailable : true,
            }
        })
        listRunSeat.push(runSeatID);
        // if (isAvailable === 0){
        //     return NextResponse.json({ error: 'seat(s) is taken' }, { status: 400 });
        // }
    }
    
    console.log("seatDescription");
    console.log(seatDesc);
    console.log("listrunseat",listRunSeat);


    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // stripe checkout session 

    //     const currentTimeMillis = Date.now();

    // // Calculate the expiration time (24 hours from now) in milliseconds
    // const expirationTimeMillis = currentTimeMillis +  30 * 60 * 1000;

    // // Convert the expiration time to seconds (Unix timestamp)
    // const expiresAt = Math.floor(expirationTimeMillis / 1000);
    //     console.log("expire",expiresAt);
    
    const runSeats = JSON.stringify(listRunSeat , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    })
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
        success_url : `${process.env.NEXTAUTH_URL}/paymentFeedback/success`,
        cancel_url : `${process.env.NEXTAUTH_URL}/paymentFeedback/cancel`,
        payment_intent_data : {
            metadata : {
                paymentReason : "purchase", 
                userID : userID,
                seats : JSON.stringify(seatIDs),
                runSeats : runSeats,
                orderId : orderID,
                paymentMethod : paymentMethod,
            },
        },
        metadata :{
            runSeats : runSeats
        }
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
