'use client';
import Head from 'next/head';
import { EventCard } from '@/components/ui/EventCard';
import { RadioDropdown } from '@/components/ui/RadioDropdown';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
const allEvents = [
    {
        id: 5,
        title: 'Mathilda The Musical',
        description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
        category: 'Musical',
        startDate: '1 Sep 2023',
        endDate: '15 Sep 2023',
        src: '/image-5.jpg'
    },
    {
        id: 6,
        title: 'Mari Kita Main Wayang by...',
        description: "It’s hijinks and humour abound in Mari Kita Main Wayang (Let’s Stage A Play)!",
        category: 'Theatre',
        startDate: '1 Sep 2023',
        endDate: '15 Sep 2023',
        src: '/image-7.jpg'
    },
    {
        id: 5,
        title: 'Mathilda The Musical',
        description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
        category: 'Musical',
        startDate: '1 Sep 2023',
        endDate: '15 Sep 2023',
        src: '/image-5.jpg'
    },
    {
        id: 6,
        title: 'Mari Kita Main Wayang by...',
        description: "It’s hijinks and humour abound in Mari Kita Main Wayang (Let’s Stage A Play)!",
        category: 'Theatre',
        startDate: '1 Sep 2023',
        endDate: '15 Sep 2023',
        src: '/image-7.jpg'
    },
    {
        id: 7,
        title: 'Taylor Swift The Eras Tour',
        description: '6 shows in Singapore!',
        category: 'Concert',
        startDate: '2 Mar 2024',
        endDate: '9 Mar 2024',
        src: '/image-9.jpg'
    }

]

const allEventsDropdownOptions = ["All events", "New Onsales"];
const categoryDropdownOptions = ["Concerts", "Festivals", "Musicals", "Sports", "Theatre"]
const Events = () => {
    return (<section className="bg-primary h-full">
        <Head>
            <title>Tessera - Events</title>
        </Head>
        <div className="z-0">
            <div className="flex flex-col mx-10 md:mx-20 mt-10">
                <p className="text-xl mb-4 font-semibold">Events</p>
                <div className='mb-2 flex flex-row'>
                    <div className='mr-4'>
                        <RadioDropdown name={"All events"} dropdownItems={allEventsDropdownOptions} />
                    </div>
                    <div className='mr-4'>
                        <RadioDropdown name={"Category"} dropdownItems={categoryDropdownOptions} />
                    </div>
                    <DateRangePicker/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        allEvents.map((item, index) => {
                            return (
                                <EventCard details={item} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </section>)
}

export default Events