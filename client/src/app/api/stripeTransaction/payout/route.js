import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authenticated } from "../ProtectRoutes";
import jwt_decode from "jwt-decode";
// post request --> transaction ID
// from transactionID get sellerID, get ticket_listing, pay user amount

export async function POST(request){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const { transactionID } = await request.json();
    const { sellerId } = await prisma.transaction.findUnique({
        where : {
            transactionId : transactionID,
        },
        select : {
            sellerId : true,
        }
    })

    const { address } = await prisma.user.findUnique({
        where : {
            userID : sellerId,
        },
        select : {
            //should be stripe accountID but i use address for now 
            address : true,
        },
    })

    const { price } = await prisma.ticketlisting.findUnique({
        where : {
            transactionId : transactionID
        },
        select : {
            price : true,
        }
    })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    try {
        // Fetch the account balance to determine the available funds
        const balance = await stripe.balance.retrieve();
        // This demo app only uses USD so we'll just use the first available balance
        // (Note: there is one balance for each currency used in your application)
        const {amount, currency} = balance.available[0];
        if(price > amount){
            return NextResponse.json({"message" : "error insufficient balance"}, { 
                status: 400, 
            })
        }
        // Create a payout
        const payout = await stripe.payouts.create({
          amount: price,
          currency: currency,
          statement_descriptor: config.appName,
        }, {stripe_account: address});
      } catch (err) {
        console.log(err);
        return NextResponse.json({"message" : "unknown error"}, { 
            status: 400, 
        })
      }

    return NextResponse.json({"message" : "successfully paid"}, { 
        status: 200, 
    })

}
