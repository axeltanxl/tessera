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
import { formatDate, formatTime } from '@/lib/formatUtil';
import { usePathname } from 'next/navigation';
import axios from "axios";


function EventDetails() {
    const url = usePathname();
    const parts = url.split("/");
    const eventID = parseInt(parts[2]);
    const [event, setEvent] = useState([]);
    const { category, description, duration, endDate, maxSlots, name, pricePerCategory, startDate, venueID } = event;
    console.log("eventID:", eventID);
    console.log("pricePerCategory:", pricePerCategory)
    const token = localStorage.getItem('jwt');
    console.log("token:", token);
    const [runTime, setRunTime] = useState(false);

    const [selectedRun, setSelectedRun] = useState('');
    const [runMap, setRunMap] = useState([]);
    const soldOut = false;
    const [venue, setVenue] = useState();
    function buttonAvailability() {
        if (!soldOut && !runTime) {
            return "Choose date";
        } else if (soldOut) {
            return "Sold Out";
        }
        return "Buy Tickets"
    }

    async function fetchRuns(eventID) {
        try {
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
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`http://localhost:8080/api/v1/events/${eventID}`, {
                    method: 'GET',
                    headers,
                });
                if (res.ok) {
                    const eventData = await res.json();
                    setEvent(eventData);
                    fetchRuns(eventID);
                } else {
                    console.error("API request failed.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        async function fetchVenueDetails() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/events/${eventID}/venue`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setVenue(response.data.name);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();
        fetchVenueDetails();
    }, [])

    useEffect(() => {
        // use the selectedRun state to determine if runTime should be true or false
        if (selectedRun !== '') {
            setRunTime(true);
        } else {
            setRunTime(false);
        }
    }, [selectedRun]);


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
                <div className='flex flex-col justify-between'>
                    <div aria-label='details' className='flex flex-col justify-center items-start py-8'>
                        <div className="mb-4 font-semibold inline text-xl">{name}</div>


                        <p className='text-md font-semibold'>From {formatDate(startDate)} to {formatDate(endDate)} </p>
                        <div>
                            <select id="dropdown" value={selectedRun} onChange={(e) => { setSelectedRun(e.target.value); }} className="border border-[#B4C1DB] rounded outline-none">
                                <option value="" >Select</option>
                                {runMap.map((item, index) => (
                                    <option value={item.runID} key={item.runID}>
                                        {formatDate(item.date)}, {formatTime(item.startTime)} - {formatTime(item.endTime)}
                                    </option>
                                ))}
                            </select>
                            {buttonAvailability() === "Choose date" ? (<Button className="text-primary bg-secondary hover:bg-secondary inline ml-2" disabled={true}>
                                Buy Tickets
                            </Button>) : (<Link href={`/payment/paymentForm/${eventID}/${selectedRun}`}>
                                <Button className="text-primary bg-secondary hover:bg-secondary inline ml-2" disabled={soldOut}>
                                    {buttonAvailability()}
                                </Button>
                            </Link>)}

                        </div>
                        <p className='text-md'><span className='font-semibold'>Venue</span> {venue} </p>
                        {/* <p className='text-md'>Ticket sale start: {ticketSaleDate} </p> */}
                        <div className='flex items-center gap-2'>
                            <p className='text-md font-semibold'>Category </p>
                            <Badge variant="outline" className="text-primary bg-secondary">{category}</Badge>
                        </div>

                    </div>
                    <div>
                        <div className='text-md font-semibold'>About the event</div>
                        <p className='text-md'>{description}</p>
                    </div>
                </div>
                <Separator />

                <div aria-label='details' className='flex flex-col justify-center items-start py-8 gap-4'>
                    <p className="text-xl mt-2 font-semibold">Pricing</p>
                    <Separator />
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
