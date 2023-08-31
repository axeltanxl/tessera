'use client'

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

const LoginForm = () => {
    const form = useForm({
        defaultValues : {
            email : "",
            password : "",
        },
    })

    const {control ,formState: {errors} , handleSubmit, reset} = form;

    const onSubmit = () => {
         toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    }
    return (
    <div className="w-full drop-shadow-lg">
        <div className="w-full bg-secondary flex justify-center px-8 rounded-t-lg">
            <h1 className="font-extrabold text-primary text-4xl">Tessera</h1>
        </div>
        <div className="bg-primary p-8 flex flex-col items-center rounded-b-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} className="shadow-inner"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="Password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full text-primary bg-secondary hover:bg-secondary">Sign In</Button>
                </form>
            </Form>

        </div>
    </div>);
}

export default LoginForm;