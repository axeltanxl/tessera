"use client"
import React from 'react'
import axios from "axios"
import {
    Button,
} from "@material-tailwind/react";
import { format } from 'date-fns';

function formatDate(inputDate) {
    if (inputDate !== undefined && inputDate !== null) {
        const formattedDate = format(new Date(inputDate), 'dd MMMM yyyy');
        return formattedDate;
    }
}



const handlePurchase = async (data) => {
    const res = await axios.post('/api/stripeTransaction/payment', data, 
    {
        headers : {
            "Content-Type" : "application/json",
        },
    });
    const {webUrl} = res.data
    window.location.assign(webUrl);
}

const ListingCard = ({ item }) => {
    const {listingID} = item.ticketListing;
    const seatCategory = item.seat.category;
    const runDate = item.run.date;
    const seatSection = item.seat.section;
    const seatRow = item.seat.row;
    const seatNumber = item.seat.seatNo;
    const ticketListingPrice = item.ticketListing.price;

    return (
        <div className='bg-white border border-[#B4C1DB] p-4 rounded-lg inline-flex'>
            <div className='flex flex-col items-center'>
                <p className='text-sm'>CAT</p>
                <p className='text-2xl font-semibold'>{seatCategory}</p>
            </div>
            <div className="flex flex-col ml-4 ">
                <p className='text-sm'>{formatDate(runDate)}</p>
                <p className='text-sm'>Zone {seatSection} | Row {seatRow} | Seat {seatNumber}</p>
                <div className='flex justify-between'>
                    <p className='flex'>${ticketListingPrice}</p>
                    <Button
                        ripple={false}
                        fullWidth={false}
                        className="bg-accent text-sm font-normal text-black px-1 w-16 rounded-md shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        onClick={() => handlePurchase(
                            {
                                "jwt" : localStorage.getItem("jwt"),
                                "listingID" : listingID,
                                "paymentMethod" : "card"
                            }
                        )}
                    >
                        Buy
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default ListingCard