"use server"
import axios from 'axios';
import Cookies from 'js-cookie';
import { cookies } from "next/headers"
import { revalidatePath } from 'next/cache'
import { unAuth } from "@/lib/utils";

export const addEvent = async (newDetails) => {
    const token = Cookies.get("jwt_spring"); // Use Cookies.get to access cookies
    const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/admin/events`, 
    {
        method: 'POST',
        headers : {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({...newDetails}),

    });
    // revalidatePath("/admin")
    return res.status;
}