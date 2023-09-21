import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// npx prisma db pull
// npx prisma migrate dev

export async function GET(request){
    const prisma = new PrismaClient();

    const eventDetails = await prisma.event.findMany();
    const json = JSON.stringify(eventDetails , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });

    return new NextResponse(json, { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });

}