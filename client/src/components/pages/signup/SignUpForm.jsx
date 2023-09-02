'use client'
import { useState } from "react"
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


const SignUpForm = ({actionName, action}) => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        defaultValues : {
            email : "",
            contactNum : "",
            address:  "",
            password : "",
            confirmPassword : "",
        },
        resolver : yupResolver(signUpSchema)
    })

    const {control ,formState: {errors} , handleSubmit, reset} = form;

    const onSubmit = (data) => {
        console.log(data)
        setIsLoading(true)
        action();
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)


        toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-secondary bg-black">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    }
    return (
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} className="shadow-inner shadow-gray-400"/>
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
                            <Input placeholder="" {...field} className="shadow-inner shadow-gray-400"/>
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
                            <Input placeholder="" {...field} className="shadow-inner shadow-gray-400"/>
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
                            <Input placeholder="" {...field} className="shadow-inner shadow-gray-400"/>
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
                            <Input placeholder="" {...field} className="shadow-inner shadow-gray-400 focus:shadow-inner focus:shadow-gray-400"/>
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