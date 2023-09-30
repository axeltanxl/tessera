'use client'
import { useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Icons } from "@/components/ui/icons/icons"
import { pwSchema } from "./accDetSchema"
import { signOut } from "next-auth/react"

const AccPw = ({userId, updatePw}) => {
    console.log("userid", userId);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        defaultValues : {
            currentPassword : "",
            password : "",
            confirmPassword : "",
        },
        resolver : yupResolver(pwSchema)
    })
    const {control ,formState: {errors} , handleSubmit, reset} = form;

    const onSubmit = async(data) => {
        const status = await updatePw(userId, data);
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)

        if(status === 200){
            setIsLoading(false)
            toast({ 
                variant: "success",
                title: "Successfully updated password",
            })
            signOut()
        }else{
            toast({ 
                variant: "destructive",
                title: "Failed to update password",
            })
        }
    }
    return (
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="" {...field} />
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
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="" {...field} className=""/>
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
                            <Input type="password" placeholder="" {...field} className=""/>
                        </FormControl>
                        <FormMessage className="text-red-400"/>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full text-primary bg-secondary hover:bg-secondary" disabled={isLoading}>
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                        Update Password
                        </Button>
                </form>
            </Form>
    );
}

export default AccPw;