import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST (request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let priceId = data.priceId;
    
    // stripe checkout session 
    const session = await stripe.checkout.sessions.create({
        line_items : [
            {
                price : priceId,
                quantity : 1
            }
        ],
        mode : 'payment', // one time payment
        success_url : "http://localhost:3000/paymentFeedback/success",
        cancel_url : "http://localhost:3000/paymentFeedback/cancel"
    })
    return NextResponse.json(session.url)
}