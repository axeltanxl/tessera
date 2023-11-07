import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth'
import { PrismaClient } from "@prisma/client";

// import CryptoJS from 'crypto-js'

// export async function POST(request){
//     console.log(await request.json())
//     const { QRUrl } = await request.json();
//     console.log(QRUrl);
//     const decrypted1 = JSON.parse(CryptoJS.AES.decrypt(QRUrl, process.env.QR_SECRET_KEY2).toString(CryptoJS.enc.Utf8));
//     console.log("decrypted",decrypted1);
//     const decrypted2 = JSON.parse(CryptoJS.AES.decrypt(decrypted1.uniqueCode, process.env.QR_SECRET_KEY1).toString(CryptoJS.enc.Utf8));
//     console.log("decrypted2",decrypted2);
//     return NextResponse.json({message : "decrypted"}, { status: 201});

// }

export async function GET(request){
    const authsession =  await getServerSession();
    console.log("authsession!!!", authsession);
    const email = authsession.user.email;
    console.log(email);

    const prisma = new PrismaClient();

    // get user ID
    const { userID } = await prisma.user.findFirst({
        where : {
            email : email 
        },
        select : {
            userID : true,
        }
    })

    const tickets = await prisma.transaction.findMany({
        where : {
            buyerID : userID,
        },
        select : {
            ticketID : true,
        }
    })
    
    // await prisma.ticket.findMany({
    //     where : {
    //         userID : userID
    //     },
    //     select : {
    //         ticketID : true,
    //     }
    // })

    // const ticketsFromMarketPlace = [];

    // for (let ticket of tickets){
    //     const id = ticket.ticketID
    //     console.log(id)
        
    //     // await prisma.ticket.findUnique({})
    // }

    console.log(tickets);
    return NextResponse.json({tickets : JSON.stringify(tickets , (key, value) => {return typeof value === 'bigint' ? value.toString() : value;})}, { status: 200});
}

