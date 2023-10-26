"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import SideNav from '@/components/ui/accountNav/SideNav';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CalendarIcon } from "@radix-ui/react-icons";
import { IoLocationOutline } from 'react-icons/io5';
import TicketCard from '@/components/ui/TicketCard';
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TbCircleLetterJ } from 'react-icons/tb';
import { formatDate, formatTime } from '@/lib/formatUtil';

const createAccount = async () => {
    const res = await axios.post("/api/stripeTransaction",{"jwt" : localStorage.getItem("jwt")},{
        headers : {
            "Content-Type" : "application/json",
        },
    });
    console.log("stripe onboard url",res.status)
    if(res.status === 201){
        const {stripeSignUp} = res.data
        window.location.assign(stripeSignUp);
    }
}

const MyTickets = () => {

  const [numTicketsSelected, setNumTicketsSelected] = useState(0);
  const [details, setDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [runs, setRuns] = useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [seats, setSeats] = useState([]);

  const fetchRunDetails = async (orderid) => {
    const token = Cookies.get("jwt_spring");
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/orders/${orderid}/run`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Failed to fetch data');
        }
      }catch(e){
        console.error(e);
      }
  }
  const fetchEventDetails = async (orderid) => {
    const token = Cookies.get("jwt_spring");
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/orders/${orderid}/event`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log("event: ", response.data);
          return response.data;
        } else {
          throw new Error('Failed to fetch data');
        }
      }catch(e){
        console.error(e);
      }
  }
  const fetchVenueDetails = async (orderid) => {
    const token = Cookies.get("jwt_spring");
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/orders/${orderid}/event/venue`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log("venue: ", response.data);
          return response.data;
        } else {
          throw new Error('Failed to fetch data');
        }
      }catch(e){
        console.error(e);
      }
  }
  const fetchSeats = async (orderid) => {
    const token = Cookies.get("jwt_spring");
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/orders/${orderid}/seats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
        
      } else {
        throw new Error('Failed to fetch data');
      }

    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    const fetchDetails = async () => {
      const token = Cookies.get("jwt_spring"); // Use Cookies.get to access cookies
        console.log("token",token);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/accountDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response",response)
        if (response.status === 200) {
            setDetails(response.data);
            
            const userid = response.data.userID;
          fetchOrders(userid);
          
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrders = async (userid) => {
      const token = Cookies.get("jwt_spring");
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/${userid}/orders`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
        
          setOrders(response.data);
          console.log("orders: ", response.data);
          const tempOrder = response.data

          const runpromises = tempOrder.map(order => fetchRunDetails(order.orderID));
          const runresults = await Promise.all(runpromises);
          setRuns(runresults);
          console.log("runs: ", runresults);

          const eventpromises = tempOrder.map(order => fetchEventDetails(order.orderID));
          const eventresults = await Promise.all(eventpromises);
          setEvents(eventresults);
          console.log("event: ", eventresults);

          const venuepromises = tempOrder.map(order => fetchVenueDetails(order.orderID));
          const venueresults = await Promise.all(venuepromises);
          setVenues(venueresults);
          console.log("venue: ", venueresults);

          const seatpromises = tempOrder.map(order => fetchSeats(order.orderID));
          const seatresults = await Promise.all(seatpromises);
          setSeats(seatresults);
          console.log("seats: ", seatresults);

        } else {
          throw new Error('Failed to fetch data');
        }
      }catch(e){
        console.error(e);
      }
    }

    fetchDetails();
  }, []);

  const handleSelectTickets = (checked) => {
    checked ? setNumTicketsSelected(numTicketsSelected + 1) : setNumTicketsSelected(numTicketsSelected - 1);
    console.log("number of tickets selected:" + numTicketsSelected);
  }

  console.log("EVENTS: ", events);
  console.log("RUNS: ", runs);
  console.log("SEATS: ", seats);
  console.log("VENUE: ", venues);
  console.log("ORDERS: ", orders);


  return (
    <section className='flex mt-10'>
      <div className='mr-20 ml-10'>
        <SideNav activeTab={0} />
      </div>
      <div>
        <p className="text-xl mb-4 font-semibold">My Tickets</p>
        <p className='font text-sm text-[#1F6EB7]'>Click on tickets to view QR code and ticket details</p>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold w-[300px]"></TableHead>
                <TableHead className="font-semibold">Tickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((item, index) => {
                return(
                <TableRow key={index} >
                  <TableCell className="font-medium">
                    <p className='mt-6 font-semibold'>{ events[index] == undefined ? "" : events[index].name }</p>
                    <br />
                    <p><CalendarIcon className="h-4 w-4 inline-block mx-1" /><span>{runs[index] == undefined ? "" : formatDate(runs[index].date) + " " + formatTime(runs[index].startTime) + " - " + formatTime(runs[index].endTime) }</span></p>
                    <p><IoLocationOutline size={20} className='inline-block' /><span>{ venues[index] == undefined ? "" : venues[index].name }</span></p>

                  </TableCell>
                  <TableCell>
                    {seats[index]==undefined? "": seats[index].map ((item, index) => {
                      return (
                        <div className='flex items-center' key={index}>
                          <Link href={`/account/tickets/${item.seatID}`}>
                            <TicketCard category={item.category} section={item.section} row={item.row} seatNo={item.seatNo}/>
                          </Link>
                          <Checkbox handleSelect={handleSelectTickets} />
                        </div>
                      )})}
                  </TableCell>

                </TableRow>
              )})}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='flex flex-1 justify-center'>
        <div className='mt-28 w-72 h-56 border border-[#B4C1DB] rounded p-6'>
          <p>0 tickets selected</p>
          <p className='font text-sm text-[#1F6EB7] mt-4'>To make direct transfer of tickets</p>
          <button className='w-24 text-sm border border-[#B4C1DB] bg-white rounded my-1 p-1'>Transfer</button>

          <p className='font text-sm text-[#1F6EB7] mt-4'>To resell your unwanted tickets</p>
          <button className='w-24 text-sm border border-[#B4C1DB] bg-white rounded my-1 p-1'
          onClick={createAccount}
          >Resell</button>
        </div>
      </div>
    </section>
  )
}

export default MyTickets