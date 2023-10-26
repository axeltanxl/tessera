import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt_decode from "jwt-decode";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const jwtHasExpired = (jwt) => {
    console.log("check jwt expiry")
    try {
        const expiry = jwt_decode(jwt).exp
        const currentTime = new Date().getTime() / 1000;
        console.log("valid spring jwt")
        return (currentTime > expiry);
    } catch (error) {
        console.log("invalid jwt")
        return true;
    }
}

export const axiosSpring = axios.create({
    // baseURL: process.env.SPRING_BACKEND,
    baseURL : "http://localhost:8080/api/v1",
    headers: { 
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${localStorage.getItem("jwt_spring")}`,
        "Content-Type" : "application/json",
    },
    withCredentials: false,
  });

export const axiosNext = axios.create({
    baseURL: process.env.NEXT_BACKEND,
    headers: { "Access-Control-Allow-Origin": "*" },
    withCredentials: false,
});

export const isAuthenticated = (session, status) => {
    "use client"
    console.log("home session:", session);

    const jwt = localStorage.getItem("jwt");
    
    if (status === "unauthenticated" || !session || !session.user) {
        redirect("/login");
    }

    if(!jwt || jwtHasExpired(jwt)){
        redirect("/login");
    }
}

axiosSpring.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!error.response) {
        alert('NETWORK ERROR')
    } else {
        console.log("errrrr")
        const code = error.response.status
        if (code === 401 || code === 403) {
            // alert("jwt invalid or missing")
            // signOut();
            toast({ 
                variant: "destructive",
                title: "Your session has expired please login again",
            })
        }
        return Promise.reject(error)
    }
});
