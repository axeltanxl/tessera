'use client';
import Head from 'next/head';
import { RadioDropdown } from '@/components/ui/RadioDropdown';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import ListingCard from '@/components/ui/cards/ListingCard';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'

function MarketplaceListing() {
    const url = usePathname();
    const parts = url.split("/");
    const eventID = parseInt(parts[3]);
    const [allListings, setAllListings] = useState([]);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        async function fetchTicketListingsByEvent() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`http://localhost:8080/api/v1/users/events/${eventID}/ticketListings`, {
                    method: 'GET',
                    headers
                });
                if (res.ok) {
                    const ticketListingData = await res.json();
                    setAllListings(ticketListingData);
                } else {
                    console.error("API request failed");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        async function fetchCATByEvent(){
            try{
                console.log("test")
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`http://localhost:8080/api/v1/events/${eventID}/categories`, {
                    method: 'GET',
                    headers
                });
                if(res.ok){
                    const categoriesByEvent = await res.json();
                    setCategories(categoriesByEvent);
                }
            }catch (error) {
                console.error("An error occurred:", error);
            }
        }
        fetchTicketListingsByEvent();
        fetchCATByEvent();

    }, [])
    console.log("allListings:", allListings);
    console.log("categories:", categories);
    const dates = ["8 Mar 2024", "9 Mar 2024", "10 Mar 2024"];
    const priceOptions = ["Low to High", "High to Low"];
    const [sort, setSort] = useState('');
    const [filteredListings, setFilteredListings] = useState([]);

    const handleDateChange = (selectedDate) => {
    }
    const handlePriceFilterChange = (sortOption) => {
        setSort(sortOption);
    };
    useEffect(() => {
        const sortedArray = [...allListings];
      
        if (sort === 'Low to High') {
          sortedArray.sort((a, b) => a.ticketListing.price - b.ticketListing.price);
        } else if (sort === 'High to Low') {
          sortedArray.sort((a, b) => b.ticketListing.price - a.ticketListing.price);
        }
      
        // Update the filteredListings state with the sorted array
        setFilteredListings(sortedArray);
      }, [sort, allListings]);
    const handleReset = () => {
        setSort('');   
    }
    const token = localStorage.getItem('jwt');

   

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
                        <RadioDropdown name={"CAT"} dropdownItems={categories} defaultValue={"CAT"} />
                    </div>
                    <div className='mx-2 xs:mr-4'>
                        <RadioDropdown name={"Price"} dropdownItems={priceOptions} defaultValue={"Price"} handleChange={handlePriceFilterChange} />
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
                    {filteredListings.map((item, index) => <ListingCard item={item} key={index} />)}
                </div>
            </div>
        </section>)
}

export default MarketplaceListing;