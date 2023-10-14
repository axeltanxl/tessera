import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authenticated } from "../ProtectRoutes";

export async function GET (request){
    return NextResponse.json({message : "this route is stripeTransaction"},{ 
        status: 200,
    })
}

export async function POST (request){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const account = await stripe.accounts.create({
        type: 'express',
        country: 'SG',
        capabilities: {
          card_payments: {requested: true},
          transfers: {requested: true},
        },
        business_type: 'individual',
      });
      const { id : connectAccountID } = account
      console.log("account");
      console.log(connectAccountID);
    //   save stripe accountID here to user address for now 


    
      const accountLink = await stripe.accountLinks.create({
        account: connectAccountID,
        refresh_url: `${process.env.NEXTAUTH_URL}/account/tickets`,
        return_url: `${process.env.NEXTAUTH_URL}/account/tickets`,
        type: 'account_onboarding',
        
      });
      console.log("accountLink");
      const {url : accountUrl} = accountLink;
      console.log(accountUrl);
      return new NextResponse({ 
        status: 201, 
        headers: { "Content-Type": "application/json" },
       })
}

