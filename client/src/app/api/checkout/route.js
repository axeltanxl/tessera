import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// npx prisma db pull
// npx prisma migrate dev

export async function POST(request){
    const prisma = new PrismaClient();
    const { eventID, quantity, category } = await request.json();
    // console.log("body: ", eventID, "qty", quantity, "category", category);
    const {pricePerCategory} = await prisma.event.findUnique({
        where : {
            eventID : eventID
        },
        select : {
            pricePerCategory : true,
        }
    })
    const pricePerCat = JSON.parse(pricePerCategory);
    const unitPrice =  pricePerCat[category];
    const totalPrice = Number(unitPrice) * Number(quantity);

    console.log("total: ", totalPrice);

    const json = JSON.stringify({totalPrice : totalPrice} , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });

    return new NextResponse(json, { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });

}