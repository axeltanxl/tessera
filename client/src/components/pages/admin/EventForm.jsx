'use client'
import { Input } from "@/components/ui/input"
import { useState } from "react"
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

const EventForm = () => {
    const form = useForm({
        defaultValues: {

        },
        // resolver : yupResolver()
    })
    const { control, formState: { errors }, handleSubmit, reset } = form;

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
    return (
        <Form {...form} >
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
            <FormLabel>Event Category</FormLabel>
            <div className="mb-1">
                <AdminDropDown name={"Category"} dropdownItems={categoryDropdownOptions} handleChange={handleCategoryChange} />
            </div>
            <FormLabel>Event Venue</FormLabel>
            <div>
                <AdminDropDown name={"Venue"} dropdownItems={venueDropdownOptions} handleChange={handleVenueChange} />
            </div>
            <FormField
                control={control}
                name="runs"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Number of runs</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} className="" />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                    </FormItem>
                )}
            />

        </Form>
    )
}

export default EventForm;