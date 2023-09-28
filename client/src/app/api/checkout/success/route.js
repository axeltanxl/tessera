import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticated } from "../../ProtectRoutes";




export async function POST(request){
    console.log("success")
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }
    const { paymentMethod, orderId } = await request.json();

    const prisma = new PrismaClient();
    console.log("payment method:", paymentMethod, orderId);
    await prisma.payment.create({
        data: {
            isSuccessful : 1,
            paymentMethod : paymentMethod,
            orderId : orderId,
        },
    })
    // await prisma.ticket.create({
    //     data: {
    //         eventDate : "date",
    //         uniqueCode : qrCode,
    //         seatID : seatID, 
    //     },
    // })
    return NextResponse.json({message : "successful reserved"}, {status : 201});
}


// TicketID
// EventDate
// UniqueCode
// SeatID (FK)
