"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from 'next/navigation';

export const ClientProtection = ({children}) => {
    const path = usePathname();
    const { data : session, status} = useSession();
    console.log("router: ", path);
    if(path === "/login" || path === "/signup"){
        return children
    }
    else if(!session || !session.user){
        redirect("/login")
    }
    return children;
}
