// import { NextResponse } from "next/server";
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