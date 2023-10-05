import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// npx prisma db pull
// npx prisma migrate dev

export async function GET(request, { params: { userID } }) {
    const prisma = new PrismaClient();
    console.log("user id:", userID);
    const orders = await prisma.custorder.findMany({
        where: {
            userID: userID
        }
    });
    const json = JSON.stringify(orders, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    })

    return new NextResponse(json, {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });

}

export async function GET(request, { params: { orderID } }) {
    const prisma = new PrismaClient();
    console.log("orderID:", orderID);
    const ticketsByOrderID = await prisma.ticket.findMany({
        where: {
            orderID: orderID
        }
    })
    const json = JSON.stringify(ticketsByOrderID, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    })

    return new NextResponse(json, {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}
