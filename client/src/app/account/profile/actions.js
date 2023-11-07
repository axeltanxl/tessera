"use server"
import { cookies } from "next/headers"
// import { signOut } from "next-auth/react"
import { revalidatePath } from 'next/cache'
import { unAuth } from "@/lib/utils";

export const fetchDetails = async () => {
    const token = cookies().get("jwt_spring").value;
    const res = await fetch(`${process.env.SPRING_BACKEND}/users/accountDetails`, 
    {
        method: 'GET',
        headers : {"Authorization": `Bearer ${token}`,}
    });
    if(!res.ok){
        throw new Error('Failed to fetch data')
    }
    const details = res.json();
    return details;
}

export const updateDetails = async (userID, newDetails) => {
    const token = cookies().get("jwt_spring").value;
    console.log(`${process.env.SPRING_BACKEND}/users/${userID}/update`)
    const res = await fetch(`${process.env.SPRING_BACKEND}/users/${userID}/update`, 
    {
        method: 'PUT',
        headers : {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({...newDetails}),
    });
    revalidatePath("/account/profile")
    return res.status
}

export const updatePw = async (userID, newDetails) => {
    const token = cookies().get("jwt_spring").value;
    console.log(`${process.env.SPRING_BACKEND}/users/${userID}/updatePwd`)
    console.log(newDetails)
    const res = await fetch(`${process.env.SPRING_BACKEND}/users/${userID}/updatePwd`, 
    {
        method: 'PUT',
        headers : {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({...newDetails}),
    });
    console.log("pwstatus")
    console.log(res.status);
    return res.status
}

