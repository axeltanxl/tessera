'use client'
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AdminDropDown } from "@/components/ui/AdminDropDown";
import { DatePicker } from "@/components/ui/DatePicker";
import { eventFormSchema } from "./eventFormSchema"
import { addEvent } from "@/app/admin/action"
import { Icons } from "@/components/ui/icons/icons"


const EventForm = () => {
    const categoryDropdownOptions = ["Not selected", "Concerts", "Festivals", "Musicals", "Sports", "Theatre"]
    const [category, setCategory] = useState("Not selected");
    
    const handleCategoryChange = (data) => {
        setCategory(data);
    }

    const venueDropdownOptions = ["Venue not selected", "National Stadium", "Singapore Indoor Stadium", "OCBC Arena Hall"]
    const [venue, setVenue] = useState('Not selected')
    const handleVenueChange = (data) => {
        setVenue(data);
    }

    useEffect(() => {
        console.log("category:", category)
        console.log("venue:", venue)
    }, [category, venue])

    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        defaultValues:{
            name: '',
            description: '',
            duration: '',
            priceCatA: '',
            priceCatB: '',
            priceCatC: '',
            priceCatD:'',
            category: '',
            venue: ''
        },
        // resolver: yupResolver(eventFormSchema)
    })
    const { control, formState: { errors }, handleSubmit, reset } = form;

    const onSubmit = async(data) => {
        console.log(errors)
        console.log("data:", data)
        
        const status = await addEvent(data);
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)

        if (status === 200) {
            setIsLoading(false)
            toast({
                variant: "success",
                title: "Successfully updated details",
            })
        }
    }


    return (
        <Form {...form} >
            <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Description</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} className="" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Category</FormLabel>
                            <FormControl>
                            <AdminDropDown name={"category"} handleChange={handleCategoryChange} dropdownItems={categoryDropdownOptions} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                {/* <div className="flex flex-col">
                    <FormLabel>Event Category</FormLabel>
                </div> */}
                <div className="flex flex-col">
                    <FormLabel>Event Venue</FormLabel>
                    <AdminDropDown name={"venue"} dropdownItems={venueDropdownOptions}handleChange={handleVenueChange} />
                </div>

                <div>
                    <FormLabel>Start Date</FormLabel>
                    <DatePicker name="startDate" />
                </div>

                <div>
                    <FormLabel>End Date</FormLabel>
                    <DatePicker name="endDate" />
                </div>


                <FormField
                    control={control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event duration (in hours)</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="priceCatA"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price for Category A</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="priceCatB"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price for Category B</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="priceCatC"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price for Category C</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="priceCatD"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price for Category D</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <div>
                    <FormLabel>Upload image as promotional material</FormLabel>
                    <Input type="file" id="myFile" name="filename" />
                </div>

                <Button type="submit" className="w-full text-primary bg-secondary hover:bg-secondary" disabled={isLoading}>
                    {/* {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
                    Create event
                </Button>
            </form>
        </Form>
    )
}

export default EventForm;