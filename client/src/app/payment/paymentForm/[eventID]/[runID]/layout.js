"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { jwtHasExpired } from "@/lib/utils";


export default ({children}) =>  {
    const { data: session, status } = useSession();

    const jwt = localStorage.getItem("jwt");
    
    if (status === "unauthenticated" || !session || !session.user) {
        redirect("/login");
    }

    if(!jwt || jwtHasExpired(jwt)){
        redirect("/login");
    }

    return (
    <>
        {children}
    </>
    )
  }