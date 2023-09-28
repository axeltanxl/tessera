import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST (request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // stripe checkout session 
    const session = await stripe.checkout.sessions.create({
        line_items : [
            {
                price_data : {
                    currency : "sgd",
                    unit_amount : 1234,
                    product_data :{
                        name : "example_product",
                        images : ["https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/09/s3-2.png"]
                    },
                },
                quantity : 3
            }
        ],
        mode : 'payment', // one time payment
        success_url : "http://localhost:3000/paymentFeedback/success",
        cancel_url : "http://localhost:3000/paymentFeedback/cancel"
    })
    return NextResponse.json(session.url)
}