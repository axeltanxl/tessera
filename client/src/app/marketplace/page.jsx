'use client';
import { MarketplaceCard } from "@/components/ui/MarketplaceCard";
import Head from 'next/head';
import { RadioDropdown } from "@/components/ui/RadioDropdown";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useEffect, useState } from "react";
const Marketplace = () => {
    const allListings = [
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Music',
            startDate: '2023-07-14 00:00:00',
            endDate: '2023-07-14 00:00:00',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '2023-07-15 00:00:00',
            endDate: '2023-07-15 00:00:00',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Theatre',
            startDate: '2024-03-08 00:00:00',
            endDate: '2024-03-08 00:00:00',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Sports',
            startDate: '2024-03-08 00:00:00',
            endDate: '2024-03-08 00:00:00',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concerts',
            startDate: '2024-03-08 00:00:00',
            endDate: '2024-03-08 00:00:00',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item: '4 x CAT 1 Standing Tickets',
            price: '400'
        },
    ]
    const categoryDropdownOptions = ["All events", "Concerts", "Festivals", "Musicals", "Sports", "Theatre"]
    const [category, setCategory] = useState("All events");
    const [startDateSelected, setStartDateSelected] = useState(null);
    const [endDateSelected, setEndDateSelected] = useState(null);
    const [filteredListings, setFilteredListings] = useState([]);

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
        let showMarketplace = allListings;
        if (category !== "All events") {
            showMarketplace = allListings.filter((item) => item.category === category);
        }

        if (startDateSelected && endDateSelected) {
            showMarketplace = showMarketplace.filter((item) => {
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                return startDate <= endDateSelected && endDate >= startDateSelected;
            })
        }
        setFilteredListings(showMarketplace);
    }, [category, startDateSelected, endDateSelected]);
    return (
        <section className="bg-primary h-full">
            <Head>
                <title>Tessera - Marketplace</title>
            </Head>
            <div className="flex flex-col md:mx-2 xl:mx-20">
                <p className="text-xl mb-4 mt-10 font-semibold">Marketplace</p>
                <div className='mb-2 flex flex-row'>
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
                {filteredListings.length > 0 ?
                    (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                filteredListings.map((item, index) => {
                                    return (
                                        <MarketplaceCard details={item} key={index} />
                                    )
                                })
                            }
                        </div>
                    ) : (<div className='mt-16'>No tickets under this category yet.</div>)}

            </div>
        </section>)
}

export default Marketplace;

