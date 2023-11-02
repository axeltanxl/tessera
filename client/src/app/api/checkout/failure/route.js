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
    
    const orderIDs = await prisma.custorder.findMany({
        where : {
            userID : userID,
        },
        select : {
            orderID : true,
            stripeOrderID : true,
        }
    })
    console.log(orderIDs)

    for(let order of orderIDs){
        const {orderID, stripeOrderID} = order;
        console.log(orderID, stripeOrderID)

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

    // await prisma.payment.create({
    //     data: {
    //         paymentMethod : paymentMethod,
    //         orderId : orderId,
    //         transactionId : transactionId,
    //     },
    // })
    
    return NextResponse.json({message : "successful reserved"}, {status : 201});
}
