import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt_decode from "jwt-decode";
import axios from "axios";

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
    baseURL: process.env.SPRING_BACKEND,
    headers: { 
        "Access-Control-Allow-Origin": "*",
        "Authorization" : localStorage.getItem("jwt")
    },
    withCredentials: false,
  });

export const axiosNext = axios.create({
    baseURL: process.env.NEXT_BACKEND,
    headers: { "Access-Control-Allow-Origin": "*" },
    withCredentials: false,
});



