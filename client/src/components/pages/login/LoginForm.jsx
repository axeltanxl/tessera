'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "./loginSchema"
import { Icons } from "@/components/ui/icons/icons"
import { signIn } from "next-auth/react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { axiosNext } from "@/lib/utils"

const loginToNext = async (data) => {
    await signIn("credentials",{
        email : data.email,
        password : data.password,
        redirect : false,
    });
}

const loginToSpring = async (data) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/auth/login`, data)
                localStorage.setItem("jwt", res.data.token);
                console.log(res.data.message);

    //here is to store spring jwt to into cookies
    // await fetch("http://localhost:3000/api/auth/login", {
    //         method: 'post',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             "jwt": res.data.token
    //         })
    //     })
    await axiosNext.post('api/auth/login', {
        "jwt": res.data.token
    })
}

const LoginForm = () => {
    const { data :session} = useSession()
    console.log("session:", session);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm({
        defaultValues : {
            email : "",
            password : "",
        },
        resolver : yupResolver(loginSchema)
    })

    const {control ,formState: {errors} , handleSubmit, reset} = form;

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            await loginToSpring(data);
            await loginToNext(data);
            router.push('/');
            // const res = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/auth/login`, data)
            // localStorage.setItem("jwt", res.data.token);
            // console.log(res.data.message);
            // const resB = await signIn("credentials",{
            //     email : data.email,
            //     password : data.password,
            //     redirect : false,
            // });
            // console.log(resB)
            toast({ 
                title: "Welcome back!",
            })
        } catch (error) {
            setIsLoading(false)
            toast({ 
                variant: "destructive",
                title: "Failed to log in",
            })
            console.log(error);
        }

        // stops loading state if take too long
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }
    return (
    <div className="w-full drop-shadow-lg">
        <div className="w-full bg-secondary flex justify-center px-8 rounded-t-lg py-4">
            <h1 className="font-extrabold text-primary text-4xl">Tessera</h1>
        </div>
        <div className="bg-primary p-8 flex flex-col items-center rounded-b-lg">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} /> 
                        </FormControl>
                        <FormMessage className="text-red-400"/>
                        </FormItem>
                    )}
                    />
                    {/* className="shadow-inner shadow-gray-400" */}
                    <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="" {...field}/>
                        </FormControl>
                        <FormMessage className="text-red-400"/>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full text-primary bg-secondary hover:bg-secondary" disabled={isLoading}>
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                        Sign In
                    </Button>
                </form>
            </Form>
            <div className="flex py-8 gap-2">
                <p>Don't have an account?</p> 
                <Link href="/signup" className="underline text-cyan-600">Sign up</Link>
            </div>
        </div>
    </div>);
}

export default LoginForm;