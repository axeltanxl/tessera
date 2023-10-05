import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req,res){
    const body = await req.json();
    const {jwt} = body;
    if(!jwt){
        return NextResponse.json({ message: 'missing jwt' }, { status: 401 });
    }
    cookies().set('jwt_spring', jwt)
    return NextResponse.json({ message: 'stored' }, { status: 200 });
}