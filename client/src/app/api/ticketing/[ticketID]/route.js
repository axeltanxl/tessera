import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticated } from "../../ProtectRoutes";
import CryptoJS from 'crypto-js'

// npx prisma db pull
// npx prisma migrate dev

const hardCodedJson = {
    orderId : 1,
    eventID : 2,
    userID : 3,
    runID : 4,
    seatID : 5,
}


export async function GET(request, {params : {ticketID}}){
    if(!authenticated){
        return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }
    const prisma = new PrismaClient();

    //by right is pull from db here
    const ticketUniqueCode = CryptoJS.AES.encrypt(JSON.stringify(hardCodedJson), process.env.QR_SECRET_KEY1).toString();

    const dtg = new Date().toISOString();
    const data = {
        dtg : dtg,
        ticketUniqueCode : ticketUniqueCode,
    }
    const qrString = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.QR_SECRET_KEY2).toString();
    // console.log(qrString)
    const decrypted1 = JSON.parse(CryptoJS.AES.decrypt(qrString, process.env.QR_SECRET_KEY2).toString(CryptoJS.enc.Utf8));
    // console.log("decrypted",decrypted1);
    const decrypted2 = JSON.parse(CryptoJS.AES.decrypt(decrypted1.ticketUniqueCode, process.env.QR_SECRET_KEY1).toString(CryptoJS.enc.Utf8));
    // console.log("decrypted2",decrypted2);
    return NextResponse.json({qrString : qrString}, { status: 201});
}