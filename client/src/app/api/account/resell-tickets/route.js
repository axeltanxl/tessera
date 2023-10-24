import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// npx prisma db pull
// npx prisma migrate dev

export async function GET(request, { params: { userID } }) {
    const prisma = new PrismaClient();
    console.log("user id:", userID);
    const ticketListing = await prisma.ticketlisting.findMany({
        where: {
            userID: userID
        }
    });
    const json = JSON.stringify(ticketListing, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    })

    return new NextResponse(json, {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });

}