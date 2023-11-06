"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { jwtHasExpired } from "@/lib/utils";

const EventLayout = ({children}) =>  {
    const { data: session, status } = useSession();
    console.log("home session:", session);

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

  export default EventLayout;