import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticated } from "../../ProtectRoutes";
import jwt_decode from "jwt-decode";
import Stripe from "stripe";


export async function POST(request){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { jwt } = await request.json();
    const decoded = jwt_decode(jwt);
    const email = decoded.sub
    const prisma = new PrismaClient();
        // get user
        const { userID } = await prisma.user.findFirst({
            where : {
                email : email 
            },
            select : {
                userID : true,
            }
        })
        
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);   
    console.log("yesterday",yesterday);

    // get only orders today
    const orderIDs = await prisma.custorder.findMany({
        where : {
            userID : userID,
            date : {
                gte :  yesterday,
            }
        },
        select : {
            orderID : true,
            stripeOrderID : true,
        }
    })
    console.log(orderIDs)

    for(let order of orderIDs){
        const {orderID, stripeOrderID} = order;

        const session = await stripe.checkout.sessions.retrieve(stripeOrderID);
        if (session.payment_status === "unpaid"){
            const runSeats = JSON.parse(session.metadata.runSeats);
            for(let seat of runSeats){
                console.log(seat);
                const { isAvailable } = await prisma.runseat.findUnique({
                    where : {
                        runSeatID : seat,
                    },
                    select : {
                        isAvailable : true,
                    }
                })
            // if session expire already then nevermind we will catch this event at webhook
            const currentTimeMillis = Date.now();
            // Convert the expiration time to seconds (Unix timestamp)
            const currentTime = Math.floor(currentTimeMillis / 1000);
            // console.log("expire at",session.expires_at)
            // console.log("currentTIme", currentTime);
            if (session.expires_at <= currentTime){
                
                if(isAvailable === 2){
                    await prisma.runseat.update({
                        where : {
                            runSeatID : seat,
                        },
                        data : {
                            isAvailable : 1,
                        }
                    }) 
                }
            }
            }
        }
    }

    // await prisma.payment.create({
    //     data: {
    //         paymentMethod : paymentMethod,
    //         orderId : orderId,
    //         transactionId : transactionId,
    //     },
    // })
    
    return NextResponse.json({message : "successful reserved"}, {status : 201});
}
