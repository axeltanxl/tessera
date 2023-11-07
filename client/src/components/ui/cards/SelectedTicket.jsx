import TicketCardWithTicketID from "./TicketCardWithTicketID";
import { useEffect, useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { formatDate, formatTime } from '@/lib/formatUtil';
import { IoLocationOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import axios from 'axios';

const SelectedTicket = ({ ticketID }) => {
    console.log("ticketid:", ticketID)
    const [details, setDetails] = useState();
    useEffect(() => {
        const fetchSeatEventRunDetails = async (ticketid) => {
            const token = Cookies.get("jwt_spring");
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/tickets/${ticketid}/events/runs/seats`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const info = response.data;
                    setDetails(info);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchSeatEventRunDetails(ticketID);
    }, [ticketID])

    console.log("sup:", details)
    return (
        <div className='grid grid-cols-2 gap-x-4' key={ticketID}>
            <div className='flex justify-center flex-col'>
                <p className='font-bold'>{details?.event.name}</p>
                <p className='flex items-center'><CalendarIcon />{formatDate(details?.run.date)} {formatTime(details?.run.startTime)} - {formatTime(details?.run.endTime)}</p>
                <p className='flex items-center'><IoLocationOutline />National Stadium</p>
            </div>
            <div className=''>
                <TicketCardWithTicketID ticketID={ticketID} />
            </div>
        </div>
    )
}

export default SelectedTicket;