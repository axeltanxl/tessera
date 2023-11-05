'use client';
import Head from 'next/head';
import { EventCard } from '@/components/ui/cards/EventCard';
import { RadioDropdown } from '@/components/ui/RadioDropdown';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { useEffect, useState } from 'react';
import { select } from '@material-tailwind/react';
import { Shower } from '@mui/icons-material';

const allEventsDropdownOptions = ["All events", "New Onsales"];
const categoryDropdownOptions = ["All events", "Concerts", "Festivals", "Musicals", "Sports", "Theatre"]
function Events() {
    const [events, setEvents] = useState([]);
console.log("get events:", events);
// const token = localStorage.getItem('jwt');
useEffect(() => {
    async function fetchData() {
        try {

                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/events`, {
                    method: 'GET',
                    headers,
                });
                if (res.ok) {
                    const eventsData = await res.json();
                    setEvents(eventsData);
                } else {
                    console.error("API request failed.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        fetchData();
    }, []);

    const [category, setCategory] = useState("All events");
    const [startDateSelected, setStartDateSelected] = useState(null);
    const [endDateSelected, setEndDateSelected] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const handleCategoryChange = (data) => {
        setCategory(data);
    }

    const handleDateChange = (selectedDate) => {
        if (selectedDate) {
            const { from, to } = selectedDate;
            setStartDateSelected(new Date(from));
            setEndDateSelected(new Date(to));
        } else {
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
        let showEvents = events;
        console.log("showEvents:", showEvents);
        if (category !== "All events") {
            showEvents = events.filter((item) => item.category === category);
        }

        if (startDateSelected || endDateSelected) {
            showEvents = showEvents.filter((item) => {
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
        setFilteredEvents(showEvents);
        console.log("filteredEvents:", filteredEvents);
    }, [category, startDateSelected, endDateSelected, events]);

    return (<section className="bg-primary h-full">
        <Head>
            <title>Tessera - Events</title>
        </Head>
        <div className="z-0">
            <div className="flex flex-col xl:mx-20 mt-10">
                <p className="text-xl mb-4 font-semibold">Events</p>
                <div className='mb-2 flex flex-row'>
                    {/* <div className='mr-4'>
                        <RadioDropdown name={"All events"} dropdownItems={allEventsDropdownOptions} />
                    </div> */}
                    <div className='mr-2 xs:mr-4'>
                        <RadioDropdown name={"Category"} dropdownItems={categoryDropdownOptions} handleChange={handleCategoryChange} defaultValue={"All events"}/>
                    </div>
                    <div className='mr-2 xs:mr-4'>
                        <DateRangePicker onDateChange={handleDateChange} />
                    </div>
                    <button className='inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground px-4 py-2 rounded-full border-[#B4C1DB] h-8 hover:bg-[#F5F7FB] w-30'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
                {filteredEvents.length > 0 ?
                    (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {
                                filteredEvents.map((item, index) => {
                                    return (
                                        <EventCard details={item} key={index} />
                                    )
                                })
                            }
                        </div>
                    )
                    : (<div className='mt-16'>No tickets under your selected filters yet. Stay tuned!</div>)
                }

            </div>
        </div>
    </section>)
}

export default Events