'use client'
import Link from "next/link"
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
import { loginSchema } from "./loginSchema"

const LoginForm = () => {
    const form = useForm({
        defaultValues : {
            email : "",
            password : "",
        },
        resolver : yupResolver(loginSchema)
    })

    const {control ,formState: {errors} , handleSubmit, reset} = form;

    const onSubmit = (data) => {
        console.log(data)
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
                            <Input placeholder="" {...field} className="shadow-inner shadow-gray-500"/>
                        </FormControl>
                        <FormMessage className="text-red-500"/>
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
                            <Input placeholder="" {...field} className="shadow-inner shadow-gray-500"/>
                        </FormControl>
                        <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full text-primary bg-secondary hover:bg-secondary">Sign In</Button>
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