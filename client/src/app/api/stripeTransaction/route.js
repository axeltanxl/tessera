import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authenticated } from "../ProtectRoutes";
import jwt_decode from "jwt-decode";

export async function GET (request){
    return NextResponse.json({message : "this route is stripeTransaction"},{ 
        status: 200,
    })
}

export async function POST (request){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }
    const { jwt } = await request.json();
    const decoded = jwt_decode(jwt);
    const email = decoded.sub
    const prisma = new PrismaClient();

    const { userID, stripeUserID } = await prisma.user.findFirst({
        where : {
            email : email 
        },
        select : {
            userID : true,
            stripeUserID : true,
        }
    })
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
     
    // if account already exist no need to create
    try{
        const account = await stripe.accounts.retrieve(stripeUserID);
        if(account.details_submitted){
            return new NextResponse({message : "account already exist"},{ 
                status: 200, 
                headers: { "Content-Type": "application/json" },
               })
        }
    }
    catch(err){
        console.log(err)
    }
    

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
    
    
      //   save stripe accountID to db 
        await prisma.user.update({
            where : {
                userID : userID,
            },
            data : {
                stripeUserID : connectAccountID
            }
        })



      const accountLink = await stripe.accountLinks.create({
        account: connectAccountID,
        refresh_url: `${process.env.NEXTAUTH_URL}/account/tickets`,
        return_url: `${process.env.NEXTAUTH_URL}/account/tickets`,
        type: 'account_onboarding',
        
      });
      console.log("accountLink");
      const {url : accountUrl} = accountLink;
      console.log(accountUrl);
      const out = JSON.stringify({stripeSignUp : accountUrl});
      console.table(out);
      return new NextResponse(out, { 
        status: 201, 
        headers: { "Content-Type": "application/json" },
       })
}

