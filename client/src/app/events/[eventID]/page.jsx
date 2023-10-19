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
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


console.log("hello")
// export const getEvent = async () =>{
//     const res = await fetch("http://localhost:8080/api/v1/events/1");
//     console.log(res);
//     const event = await res.json()

//   return event
// }
console.log("hello2")


function EventDetails() {
    const [event, setEvent] = useState([]);
    const {eventID, category, description, duration, endDate, maxSlots, name, pricePerCategory, startDate, venueID } = event;
    console.log("pricePerCategory:", pricePerCategory)
    const token = localStorage.getItem('jwt');
    console.log("token:", token);
    const [runTime, setRunTime] = useState(false);

    const [selectedRun, setSelectedRun] = useState([]);
    const [runMap, setRunMap] = useState([]);
    const soldOut = false;

    function buttonAvailability(){
        if (!soldOut && !runTime){
            return "Choose Slot";
        }else if (soldOut){
            return "Sold Out";
        }
        return "Buy Tickets"
    }

    async function fetchRuns(eventID) {
        try{
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const res = await fetch(`http://localhost:8080/api/v1/events/${eventID}/runs`, {
                method: 'GET',
                headers,
            });
            if (res.ok) {
                const result = await res.json();
                setRunMap(result);
                console.log("runs: ", result);
            } else {
                console.error("API request failed.");
            }
        }catch(e){
            console.error(e);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {

                const search = window.location.href;
                const split = search.split("/");
                const eid = parseInt(split[split.length - 1])

                console.log(search);
                console.log("eid: ", eid);

                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`http://localhost:8080/api/v1/events/${eid}`, {
                    method: 'GET',
                    headers,
                });
                if (res.ok) {
                    const eventData = await res.json();
                    setEvent(eventData);
                    fetchRuns(eid);
                } else {
                    console.error("API request failed.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        fetchData();
    }, [])

    console.log("eventID: ", eventID);
    console.log(runTime);
    console.log(runMap)

    

    return (
        <div className="w-full min-h-screen">
            <div
                style={{ backgroundImage: `url()` }} //makes bg dynamic
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
                <Separator />
                <div className='flex justify-between'>
                    <div aria-label='details' className='flex flex-col justify-center items-start py-8 gap-4'>
                        <div className=' w-full flex justify-between'>
                            <div className="mb-4 font-semibold inline">{name}</div>
                            <Link href={`/payment/paymentForm/${eventID}/${selectedRun}`}>
                                <Button variant="outlined" className="text-primary bg-secondary hover:bg-secondary inline" disabled={soldOut}>
                                    {buttonAvailability()}
                                </Button>
                            </Link>
                        </div>

                        <p className='text-md font-semibold'>Event from {startDate} to {endDate} </p>
                        <div>
                            <select id="dropdown" value={selectedRun} onChange={(e) => {setSelectedRun(e.target.value); setRunTime(true);}} >
                                <option value="" style={{fontSize:"10px"}}>Select</option>
                                {runMap.map((item, index) => (
                                    <option value={item.runID} key={item.runID} style={{fontSize:"10px"}}>
                                        {item.date}, {item.startTime} - {item.endTime}
                                    </option>
                                // <div className='flex items-center' key={index}>
                                //     {/* <Link href={`/account/tickets/${item.ticketID}`}>
                                //     <TicketCard category={item.category} section={item.section} row={item.row} seatNo={item.seatNo} />
                                //     </Link>
                                //     <Checkbox handleSelect={handleSelectTickets} /> */}
                                //     {item.runID};
                                // </div>
                                ))}
                            </select>
                        </div>
                        <p className='text-md font-semibold'>Venue {venueID} </p>
                        {/* <p className='text-md'>Ticket sale start: {ticketSaleDate} </p> */}
                        <div className='flex items-center gap-2'>
                            <p className='text-md font-semibold'>Category </p>
                            <Badge variant="outline" className="text-primary bg-secondary">{category}</Badge>
                        </div>
                        <p className='text-md'>{description}</p>
                    </div>
                </div>
                <Separator />

                <div aria-label='details' className='flex flex-col justify-center items-start py-8 gap-4'>
                    <p className="text-xl mt-2 font-semibold">Pricing</p>
                    <Separator />
                    {/* <div className='w-full flex gap-4'>
                        {
                            pricePerCategory ? (Object.entries(JSON.parse(pricePerCategory)).map(([cat, price], index) => {
                                console.log("cat:", cat);
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
                                                <div className="w-2/3 ">
                                                    <h4 className="text-sm font-semibold">Price: ${price}</h4>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                )
                            })
                            ) : (<div>loading...</div>)
                        }
                    </div> */}
                </div>

                <div aria-label='event map' className='w-full flex justify-center items-center'>
                    <img
                        src={"/taylor-swift-seating.jpg"}
                        width={800}
                        height={800}
                        alt="seating "
                    />
                </div>
            </div>


        </div>)
}

export default EventDetails;

//category description start end date duration price per category max slots
