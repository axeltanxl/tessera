'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
const TicketCardWithTicketID = ({ticketID}) => {
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
                const info =  response.data;
                setDetails(info);
              } else {
                throw new Error('Failed to fetch data');
              }
            } catch (error) {
              console.error(error);
            }
          }
        
          fetchSeatEventRunDetails(ticketID);
    }, [])
  return (
    <div className='bg-white w-48 border border-[#B4C1DB] my-2 p-4 rounded hover:cursor-pointer'>
        <p>Category {details?.seat.category} Ticket</p>
        <p>Zone {details?.seat.section}</p>
        <p>Row {details?.seat.row}, Seat {details?.seat.seatNo}</p>  
    </div>
  )
}

export default TicketCardWithTicketID