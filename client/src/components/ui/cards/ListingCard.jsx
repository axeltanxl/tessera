import React from 'react'
import {
    Button,
} from "@material-tailwind/react";
const ListingCard = ({ details }) => {
    const { cat, zone, row, seat, date, price } = details;
    return (
        <div className='bg-white border border-[#B4C1DB] p-4 rounded-lg inline-flex'>
            <div className='flex flex-col items-center'>
                <p className='text-sm'>CAT</p>
                <p className='text-2xl font-semibold'>{cat}</p>
            </div>
            <div className="flex flex-col ml-4 ">
                <p className='text-sm'>{date}</p>
                <p className='text-sm'>Zone {zone} | Row {row} | Seat {seat}</p>
                <div className='flex justify-between'>
                    <p className='flex'>${price}</p>
                    <Button
                        ripple={false}
                        fullWidth={false}
                        className="bg-accent text-sm font-normal text-black p-1 w-20 rounded-md shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                        Buy
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default ListingCard