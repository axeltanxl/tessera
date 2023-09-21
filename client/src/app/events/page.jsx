'use client';
import Head from 'next/head';
import { EventCard } from '@/components/ui/EventCard';
import { RadioDropdown } from '@/components/ui/RadioDropdown';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { useEffect, useState } from 'react';
import { select } from '@material-tailwind/react';
import { Shower } from '@mui/icons-material';

const allEvents = [
    {
        id: 1,
        title: 'Mathilda The Musical',
        description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
        category: 'Musicals',
        startDate: '2023-01-12 00:00:00',
        endDate: '2023-02-12 00:00:00',
        src: '/image-5.jpg'
    },
    {
        id: 2,
        title: 'Mari Kita Main Wayang by...',
        description: "It’s hijinks and humour abound in Mari Kita Main Wayang (Let’s Stage A Play)!",
        category: 'Festivals',
        startDate: '2023-07-20 00:00:00',
        endDate: '2023-08-20 00:00:00',
        src: '/image-7.jpg'
    },
    {
        id: 3,
        title: 'Mathilda The Musical',
        description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
        category: 'Musicals',
        startDate: '2023-07-25 00:00:00',
        endDate: '2023-10-20 00:00:00',
        src: '/image-5.jpg'
    },
    {
        id: 4,
        title: 'Mari Kita Main Wayang by...',
        description: "It’s hijinks and humour abound in Mari Kita Main Wayang (Let’s Stage A Play)!",
        category: 'Theatre',
        startDate: '2023-07-14 00:00:00',
        endDate: '2023-07-16 00:00:00',
        src: '/image-7.jpg'
    },
    {
        id: 5,
        title: 'Taylor Swift The Eras Tour',
        description: '6 shows in Singapore!',
        category: 'Concerts',
        startDate: '2024-03-02 00:00:00',
        endDate: '2024-03-09 00:00:00',
        src: '/image-9.jpg'
    }

]

const allEventsDropdownOptions = ["All events", "New Onsales"];
const categoryDropdownOptions = ["All events", "Concerts", "Festivals", "Musicals", "Sports", "Theatre"]
const Events = () => {

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
        let showEvents = allEvents;
        if (category !== "All events") {
            showEvents = allEvents.filter((item) => item.category === category);
        }

        if (startDateSelected && endDateSelected) {
            showEvents = showEvents.filter((item) => {
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                return startDate <= endDateSelected && endDate >= startDateSelected;
            })
        }
        setFilteredEvents(showEvents);
    }, [category, startDateSelected, endDateSelected]);

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
                        <RadioDropdown name={"Category"} dropdownItems={categoryDropdownOptions} handleChange={handleCategoryChange} />
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