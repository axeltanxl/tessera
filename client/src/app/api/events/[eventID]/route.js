import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// npx prisma db pull
// npx prisma migrate dev

export async function GET(request, {params : {eventID}}){
    const prisma = new PrismaClient();
    // const session = await getServerSession(request, res, authOptions);
    // if(!session){
    //     res.status(401).json({message : "You must be logged in"})
    // }

    console.log("id: ", eventID)
    const eventDetails = await prisma.event.findUnique({
        where : {
            eventID : eventID
        }
    })
    const json = JSON.stringify(eventDetails , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });

    return new NextResponse(json, { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });

}