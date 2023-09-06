'use client'
import SignUpForm from "@/components/pages/signup/SignUpForm";
import Link from "next/link"
import axios from "axios";

const signup = async(data) => {
    try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/register", data)
        localStorage.setItem("jwt", res.data.token);
        console.log(res.data.message);
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
            <SignUpForm action={(data) => {signup(data)}} actionName={"Sign Up"}/>
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
