import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticated } from "../../ProtectRoutes";



export async function POST(request){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }
    // const prisma = new PrismaClient();
    // const { paymentMethod, orderId, transactionId } = await request.json();

    // await prisma.payment.create({
    //     data: {
    //         paymentMethod : paymentMethod,
    //         orderId : orderId,
    //         transactionId : transactionId,
    //     },
    // })
    
    return NextResponse.json({message : "successful reserved"}, {status : 201});
}
