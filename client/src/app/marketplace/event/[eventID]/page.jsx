'use client';
import Head from 'next/head';
import { RadioDropdown } from '@/components/ui/RadioDropdown';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import ListingCard from '@/components/ui/cards/ListingCard';
import { useState, useEffect } from 'react';

const MarketplaceListing = () => {
    const dates = ["8 Mar 2024", "9 Mar 2024", "10 Mar 2024"];
    const cat = ["A", "B", "C", "D"];
    const priceOptions = ["Low to High", "High to Low"];
    const [filteredListings, setFilteredListings] = useState([]);

    const handleDateChange = (selectedDate) => {
    }
    const handleReset = () => {

    }

    const fakeData = [
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 22,
            date: "8 March 2024, 6 - 9pm",
            price: 300
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 23,
            date: "8 March 2024, 6 - 9pm",
            price: 320,
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 24,
            date: "8 March 2024, 6 - 9pm",
            price: 310
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 25,
            date: "8 March 2024, 6 - 9pm",
            price: 320
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 22,
            date: "9 March 2024, 6 - 9pm",
            price: 320
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 23,
            date: "9 March 2024, 6 - 9pm",
            price: 320
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 24,
            date: "9 March 2024, 6 - 9pm",
            price: 320
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 25,
            date: "9 March 2024, 6 - 9pm",
            price: 320
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 22,
            date: "8 March 2024, 6 - 9pm"
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 23,
            date: "9 March 2024, 6 - 9pm",
            price: 320
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 24,
            date: "9 March 2024, 6 - 9pm",
            price: 320
        },
        {
            cat: 'A',
            zone: 'PA',
            row: 22,
            seat: 25,
            date: "9 March 2024, 6 - 9pm",
            price: 320
        },
    ]

    return (
        <section className="bg-primary h-full">
            <Head>
                <title>Tessera - Marketplace</title>
            </Head>
            <div className="flex flex-col md:mx-2 xl:mx-20">
                <p className="text-xl mb-4 mt-10 font-semibold">Marketplace</p>
            </div>
            <div className="bg-cover bg-center bg-[url('/gradient.png')]  h-[284px] flex items-center p-10">
                <img src={"/image-9.jpg"} className='h-[230px]' />
                <div className="items-start flex flex-col flex-1 p-20">
                    <p className='text-2xl'>Taylor Swift The Eras Tour</p>
                    <p className='mb-2'>Ticket marketplace closing in</p>
                    <div className='grid grid-cols-7 grid-rows-1 gap-x-1 gap-y-1'>
                        <p className='text-center'>Days</p>
                        <p></p>
                        <p className='text-center'>Hours</p>
                        <p></p>
                        <p className='text-center'>Minutes</p>
                        <p></p>
                        <p className='text-center'>Seconds</p>
                        <p className='text-5xl text-center'>13</p>
                        <p></p>
                        <p className='text-5xl text-center'>10</p>
                        <p className='text-center'>:</p>
                        <p className='text-5xl text-center'>20</p>
                        <p className='text-center'>:</p>
                        <p className='text-5xl text-center'>45</p>
                    </div>
                </div>
            </div>
            <div className='px-20 py-8 flex justify-between'>
                <div className='flex'>
                    <div className='mr-2 xs:mr-4'>
                        <RadioDropdown name={"Date"} dropdownItems={dates} defaultValue={"Date"} />
                    </div>
                    <div className='mx-2 xs:mr-4'>
                        <RadioDropdown name={"CAT"} dropdownItems={cat} defaultValue={"CAT"} />
                    </div>
                    <div className='mx-2 xs:mr-4'>
                        <RadioDropdown name={"Price"} dropdownItems={priceOptions} defaultValue={"Price"} />
                    </div>
                    <button className='inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground px-4 py-2 rounded-full border-[#B4C1DB] h-8 hover:bg-[#F5F7FB] w-30'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
                <button className="bg-black text-white text-sm px-2 rounded-lg">View seat map</button>
            </div>
            <div className='px-20'>
                <div className='grid grid-cols-4 gap-4'>
                    {fakeData.map((item, index) => <ListingCard details={item} key={index} />)}
                </div>
            </div>
        </section>)
}

export default MarketplaceListing;