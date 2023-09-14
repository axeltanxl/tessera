'use client'
import LoginForm from "@/components/pages/login/LoginForm";
import axios from "axios";
import { signIn } from "next-auth/react";
const login = async(data) => {

    try {
        // const res = await axios.post("http://localhost:8080/api/v1/auth/login", data)
        // localStorage.setItem("jwt", res.data.token);
        // console.log(res.data.message);

        const resB = await signIn("credentials",{
            email : data.email,
            password : data.password,
            redirect : false,
        })
        console.log("resB", resB);
    } catch (error) {
        console.log(error);
    }
}

const Page = () => {
    return (
    <div className="w-full flex flex-col justify-center items-center">
        <div className="w-2/5 z-10">
            <LoginForm action={(data) => login(data)}/>
        </div>
    </div>)
}
export default Page;
