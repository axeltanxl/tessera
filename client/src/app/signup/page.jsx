'use client'
import SignUpForm from "@/components/pages/signup/SignUpForm";
import Link from "next/link"
import axios from "axios";
import { signIn } from "next-auth/react";
import { axiosNext } from "@/lib/utils";

const loginToNext = async (data) => {
    await signIn("credentials",{
        email : data.email,
        password : data.password,
        redirect : false,
    });
}

const loginToSpring = async (data) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/auth/register`, data)
                localStorage.setItem("jwt", res.data.token);
                console.log(res.data.message);
                await axiosNext.post('api/auth/login', {
                    "jwt": res.data.token
                })
            }

const signup = async (data) => {
    try {
        loginToSpring(data);
        loginToNext(data);
    } catch (error) {
        console.log(error);
    }
}

const Page = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">

            <div className="w-2/5">
                <div className="w-full drop-shadow-lg">
                    <div className="w-full bg-secondary flex justify-center px-8 rounded-t-lg py-4">
                        <h1 className="font-extrabold text-primary text-4xl">Tessera</h1>
                    </div>


                    <div className="bg-primary p-8 flex flex-col items-center rounded-b-lg">
                        <SignUpForm action={(data) => { signup(data) }} actionName={"Sign Up"} />
                        <div className="flex py-8 gap-2">
                            <p>Already have an account?</p>
                            <Link href="/login" className="underline text-cyan-600">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default Page;
