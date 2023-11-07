'use client';
import { MarketplaceCard } from "@/components/ui/cards/MarketplaceCard";
import Head from 'next/head';
import { RadioDropdown } from "@/components/ui/RadioDropdown";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/header/SearchBar";
const Marketplace = () => {
    const [allMarketplaces, setAllMarketplaces] = useState([]);
    //fetch data
    const token = localStorage.getItem('jwt');
    useEffect(() => {
        async function fetchOpenMarketplaces(){
            try{
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/openMarketplaces`, {
                    method: 'GET',
                    headers
                });
                if (res.ok) {
                    const openMarketplaces = await res.json();
                    setAllMarketplaces(openMarketplaces);
                } else {
                    console.error("API request failed");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        fetchOpenMarketplaces();
    }, [])
    //filters
    const categoryDropdownOptions = ["All events", "Concerts", "Festivals", "Musicals", "Sports", "Theatre"]
    const [category, setCategory] = useState("All events");
    const [startDateSelected, setStartDateSelected] = useState(null);
    const [endDateSelected, setEndDateSelected] = useState(null);
    const [filteredMarketplaces, setFilteredMarketplaces] = useState([]);

    const handleCategoryChange = (data) => {
        setCategory(data);
    }

    const handleDateChange = (selectedDate) => {
        if (selectedDate) {
            const { from, to } = selectedDate;
            setStartDateSelected(new Date(from));
            setEndDateSelected(new Date(to));
        } else {
            // Handle the case when selectedDate is undefined (e.g., when clearing the date range)
            setStartDateSelected(null);
            setEndDateSelected(null);
        }
    }

    const handleReset = () => {
        setStartDateSelected(null);
        setEndDateSelected(null);
        setCategory("All events");
    }

    useEffect(() => {
        let showMarketplace = allMarketplaces;
        console.log("show:", showMarketplace);
        if (category !== "All events") {
            showMarketplace = showMarketplace.filter((item) => item.eventDTO.category === category);
        }

        if (startDateSelected || endDateSelected) {
            showMarketplace = showMarketplace.filter((item) => {
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                const selectedStartDate = new Date(startDateSelected);
                let selectedEndDate = new Date(endDateSelected);
                if (isNaN(selectedEndDate)) { //if selectedEndDate is invalid / not selected properly
                    selectedEndDate = selectedStartDate; 
                }
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);
                selectedStartDate.setHours(0, 0, 0, 0);
                selectedEndDate.setHours(0, 0, 0, 0);
                
                return startDate <= selectedEndDate && endDate >= selectedStartDate;
            })
        }
        setFilteredMarketplaces(showMarketplace);
    }, [category, startDateSelected, endDateSelected, allMarketplaces]);
    return (
        <section className="bg-primary h-full">
            <Head>
                <title>Tessera - Marketplace</title>
            </Head>
            <div className="flex flex-col md:mx-2 xl:mx-20">
                <div className="flex  items-end">
                    <p className="text-xl mb-4 mt-10 font-semibold">Marketplace</p>
                    <SearchBar style={"mb-4 ml-4 w-96"} isMarketplace={true}/>
                </div>

                <div className='mb-2 flex flex-row'>
                    <div className='mr-2 xs:mr-4'>
                        <RadioDropdown name={"Category"} dropdownItems={categoryDropdownOptions} handleChange={handleCategoryChange} defaultValue={"All events"}/>
                    </div>
                    <div className='mr-2 xs:mr-4'>
                        <DateRangePicker onDateChange={handleDateChange} isMarketplace/>
                    </div>
                    <button className='inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground px-4 py-2 rounded-full border-[#B4C1DB] h-8 hover:bg-[#F5F7FB] w-30'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
                {filteredMarketplaces.length > 0 ?
                    (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {
                                filteredMarketplaces.map((item, index) => {
                                    return (
                                        <MarketplaceCard details={item} key={index} />
                                    )
                                })
                            }
                        </div>
                    ) : (<div className='mt-16'>No tickets under your selected filters yet. Stay tuned!</div>)}

            </div>
        </section>)
}

export default Marketplace;

