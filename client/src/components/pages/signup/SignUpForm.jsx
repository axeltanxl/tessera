'use client'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
import { signUpSchema } from "./signUpschema"
import { Icons } from "@/components/ui/icons/icons"
import { useRouter } from "next/navigation"
import { axiosSpring } from "@/lib/utils"



const SignUpForm = ({actionName, action}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm({
        defaultValues : {
            name : "",
            email : "",
            contactNum : "",
            address:  "",
            password : "",
            confirmPassword : "",
        },
        resolver : yupResolver(signUpSchema)
    })
    const {control ,formState: {errors} , handleSubmit, reset} = form;

    const onSubmit = async(data) => {
        console.log(data)
        setIsLoading(true)
        await action(data);
        router.push('/');
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
    }
    return (
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400"/>
                            </FormItem>
                        )}
                        />
                    <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} className=""/>
                        </FormControl>
                        <FormMessage className="text-red-400"/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={control}
                    name="contactNum"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} className=""/>
                        </FormControl>
                        <FormMessage className="text-red-400"/>
                        </FormItem>
                    )}
                    />
                   <FormField
                    control={control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} className=""/>
                        </FormControl>
                        <FormMessage className="text-red-400"/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="" type="password" {...field} className=""/>
                        </FormControl>
                        <FormMessage className="text-red-400"/>
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input placeholder="" type="password" {...field} className=""/>
                        </FormControl>
                        <FormMessage className="text-red-400"/>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full text-primary bg-secondary hover:bg-secondary" disabled={isLoading}>
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                        {actionName}
                    </Button>
                </form>
            </Form>
    );
}

export default SignUpForm;