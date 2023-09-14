'use client';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"  
import Image from 'next/image'


export const getEvent = async () =>{
    const res = await fetch("http://localhost:3001/api/v1/events/1");
    console.log(res);
    const event = await res.json()

  return event
}

const EventDetails = async () => {
    const { id, name, poster,
        category , description,
        startDate, endDate, ticketSaleDate,
        pricePerCategory, maxSlots,
        soldOut, venue
    }  = await getEvent();

    return (
    <div className="w-full min-h-screen">
        
        <div className="w-full h-2/3 bg-[url('/images/swift_tickets.jpeg')] -z-10 ">
            <div className='w-full h-full bg-gradient-to-b flex justify-center items-center from-transparent to-primary'>
                <Image
                    src={poster}
                    width={500}
                    height={800}
                    alt="Picture of the author"
                />
            </div>
        </div>
        <div className='w-full h-full bg-primary py-8'>
            <h1 className='text-5xl py-8'>Event Details</h1>
            <Separator/>
            <div className='flex justify-between'>
                <div aria-label='details' className='flex flex-col justify-center items-start py-8 gap-4'>
                    <h3 className='text-2xl font-bold'>Event: {name}</h3>
                    <p className='text-md'>Event from {startDate} to {endDate} </p>
                    <p className='text-md'>Venue: {venue.name} </p>
                    <p className='text-md'>Ticket sale start: {ticketSaleDate} </p>
                    <div className='flex items-center gap-2'>
                    <p className='text-md'>Category: </p>
                    <Badge variant="outline" className="text-primary bg-secondary">{category}</Badge>
                </div>
                <p className='text-md'>{description}</p>
                </div>
                <div className='flex justify-center items-center'>
                    <Button variant="outlined"  className="text-primary bg-secondary hover:bg-secondary" disabled={soldOut}>
                        {soldOut ? "Sold out" : "Buy Tickets"}
                    </Button>
                </div>
            </div>
            <Separator/>
            
            <div aria-label='details' className='flex flex-col justify-center items-start py-8 gap-4'>
                    <h3 className='text-2xl font-bold'>Pricing</h3>
                    <Separator/>
                    <div className='w-full flex gap-4'>
                        {
                            Object.keys(pricePerCategory).map((cat) => {
                                return (
                                <HoverCard >
                                <HoverCardTrigger asChild>
                                    <Button variant="link" className="text-primary bg-secondary hover:bg-secondary">Cat {cat}</Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80 bg-primary" align="start" sideOffset={-20}>
                                    <div className="flex justify-between space-x-4">
                                        <div className='flex flex-col justify-center items-center'>
                                            <p>CAT</p>
                                            <p className='text-4xl'>{cat}</p>
                                        </div>
                                    <div className="w-2/3 space-y-1">
                                        <h4 className="text-sm font-semibold">Price: ${pricePerCategory[cat].price}</h4>
                                        <p className="text-sm">
                                            Details: {pricePerCategory[cat].specifics}
                                        </p>
                                    </div>
                                    </div>
                                </HoverCardContent>
                                </HoverCard>
                                )
                            })
                        }
                    </div>
                </div>

                <div aria-label='event map' className='w-full flex justify-center items-center'>
                    <Image
                        src={venue.map}
                        width={800}
                        height={800}
                        alt="Picture of the author"
                    />
                </div>
        </div>


    </div>)
}

export default EventDetails;

//category description start end date duration price per category max slots
