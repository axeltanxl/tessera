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
import { updateDetails } from "@/app/account/profile/actions"
import { accDetSchema } from "./accDetSchema"

const AccDet = ({details}) => {
    const preFill = JSON.parse(details);
    console.log(preFill)
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        defaultValues : {
            name : preFill.name,
            email : preFill.email,
            contactNum : preFill.contactNum,
            address:  preFill.address,
        },
        resolver : yupResolver(accDetSchema)
    })
    const {control ,formState: {errors} , handleSubmit, reset} = form;

    const onSubmit = async(data) => {
        console.log(errors)
        const status = await updateDetails(preFill.userID, data);
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)

        if(status === 200){
            setIsLoading(false)
            toast({ 
                variant: "success",
                title: "Successfully updated details",
            })
        }
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
                    <Button type="submit" className="w-full text-primary bg-secondary hover:bg-secondary" disabled={isLoading}>
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                        Update Details
                        </Button>
                </form>
            </Form>
    );
}

export default AccDet;