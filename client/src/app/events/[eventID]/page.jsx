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
    const res = await fetch("http://localhost:8080/api/v1/events/1");
    console.log(res);
    const event = await res.json()

  return event
}

const EventDetails = async () => {
    const { eventID, name, poster,
        category , description, ticketImg,
        startDate, endDate, ticketSaleDate,
        pricePerCategory, maxSlots,
        soldOut, venue
    }  = await getEvent();
    return (
    <div className="w-full min-h-screen">
        <div 
            style={{backgroundImage:`url(${ticketImg})`}} //makes bg dynamic
            className="w-full h-2/3 -z-10 ">
            <div className='w-full h-full bg-gradient-to-b flex justify-center items-center from-transparent to-[#B4C1DB]'>
                <Image
                    src={"/image-10.jpg"}
                    alt="Event banner"
                    height={500}
                    width={800}
                />
            </div>
        </div>
        <div className='w-full h-full bg-primary py-8'>
        <p className="text-xl mb-4 mt-2 font-semibold">Event Details</p>
            <Separator/>
            <div className='flex justify-between'>
                <div aria-label='details' className='flex flex-col justify-center items-start py-8 gap-4'>
                <p className="mb-4 font-semibold">Taylor Swift The Eras Tour</p>

                    <p className='text-md'>Event from {startDate} to {endDate} </p>
                    <p className='text-md'>Venue: {venue} </p>
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
            <p className="text-xl mt-2 font-semibold">Pricing</p>
                    <Separator/>
                    <div className='w-full flex gap-4'>
                        {
                            Object.keys(pricePerCategory).map((cat, index) => {
                                return (
                                <HoverCard key={index}>
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
