import Stripe from "stripe";
import { NextResponse } from "next/server";
import { authenticated } from "../ProtectRoutes";


export async function GET(request){
    if(authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list({
        limit : 10,
    });
    return NextResponse.json(prices.data.reverse());

}