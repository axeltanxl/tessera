import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

// npx prisma db pull
// npx prisma migrate dev

export async function GET(request, {params: {eventID}}){
    const prisma = new PrismaClient();
    console.log("id:", eventID);
    const ticketListings = await prisma.ticketListing.findMany({
        where : {
            eventID: eventID
        }
    });
    const json = JSON.stringify(ticketListings, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    })

    return new NextResponse(json, { 
        status: 201, 
        headers: { "Content-Type": "application/json" },
       });
}

export async function GET(request, {params: {eventID}}){
    const prisma = new PrismaClient();
    console.log("id:", eventID);
    const categories = await prisma.ticket.findMany({
        where : {
            eventID: eventID
        }
    });
    const json = JSON.stringify(categories, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    })

    return new NextResponse(json, { 
        status: 201, 
        headers: { "Content-Type": "application/json" },
       });
}

export async function GET(request, {params: {eventID}}){
    const prisma = new PrismaClient();
    console.log("id:", eventID);
    const eventRuns = await prisma.event.findMany({
        where: {
            eventID: eventID
        }
    });
    const json = JSON.stringify(eventRuns, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    })

    return new NextResponse(json, { 
        status: 201, 
        headers: { "Content-Type": "application/json" },
       });
}

export async function GET(request){
    const prisma = new PrismaClient();
    const openMarketplaces = await prisma.marketplace.findMany();
    const json = JSON.stringify(openMarketplaces, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    })

    return new NextResponse(json, { 
        status: 201, 
        headers: { "Content-Type": "application/json" },
       });
}
