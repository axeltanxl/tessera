import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { authenticated } from "../ProtectRoutes";
import jwt_decode from "jwt-decode";
import { cookies } from 'next/headers'
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET (request){
    const prisma = new PrismaClient();
    try{
        const session = await getServerSession(authOptions);
        console.log(session?.user?.email);
        const email = session?.user?.email;
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
        const { url } = await stripe.accounts.createLoginLink(stripeUserID);
        return NextResponse.json({message : "this route is stripeTransaction", stripeAccLoginUrl : url},{ 
            status: 200,
        })

    }catch{
        return NextResponse.json({message : "No existing stripe account"},{ 
            status: 400,
        })
    }
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
        if(account.details_submitted && account.payouts_enabled){
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

