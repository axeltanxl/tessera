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
import TicketCard from '@/components/ui/cards/TicketCard';
import Link from 'next/link';
import Checkbox from '@/components/ui/Checkbox';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Cookies from 'js-cookie';

const getOrders = [
  {
    orderID: 1,
    orderDate: "2023/09/20 17:35:40",
    eventTitle: "Taylor Swift The Eras Tour",
    eventDate: "2024/03/08 18:00:00",
    eventVenue: "National Stadium",
    ticketCat: 'CAT 1',
    price: 300.00,
    ticketQuantity: 4
  }
]

const getTicketsWithSeat = [
  {
    ticketID: 1,
    uniqueCode: 123,
    seatID: 1,
    category: 'CAT A',
    section: 'PA',
    row: 18,
    seatNo: 22
  },
  {
    ticketID: 2,
    uniqueCode: 123,
    seatID: 2,
    category: 'CAT A',
    section: 'PA',
    row: 18,
    seatNo: 23
  },
  {
    ticketID: 3,
    uniqueCode: 123,
    seatID: 3,
    category: 'CAT A',
    section: 'PA',
    row: 18,
    seatNo: 24
  },
  {
    ticketID: 4,
    uniqueCode: 123,
    seatID: 4,
    category: 'CAT A',
    section: 'PA',
    row: 18,
    seatNo: 25
  }
]

const MyTickets = () => {


  const [details, setDetails] = useState(null);
  const [tickets, setTickets] = useState([]);

  
  useEffect(() => {
    const fetchDetails = async () => {
      const token = Cookies.get("jwt_spring"); // Use Cookies.get to access cookies

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/accountDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setDetails(response.data);

          const userid = response.data.userID;
          fetchTix(userid);
          
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTix = async (userid) => {
      const token = Cookies.get("jwt_spring");
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/${userid}/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTickets(response.data);
          console.log(response.data);
          
        } else {
          throw new Error('Failed to fetch data');
        }

      } catch (err) {
        console.error(err);
      }
      
    }

    fetchDetails();
  }, []);

  console.log(details?.userID);

  // if (userid){
  //   useEffect(() => {
  //     const fetchDetails = async () => {
  //     const token = Cookies.get("jwt_spring"); // Use Cookies.get to access cookies

  //     try {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/accountDetails`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.status === 200) {
  //         setDetails(response.data);
  //       } else {
  //         throw new Error('Failed to fetch data');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     }
  //   },[]);
  // }

  // useEffect(() => {
  //   // Define the backend API URL
  //   const apiUrl = `${process.env.NEXT_PUBLIC_SPRING_BACKEND}/api/users/${userid}/tickets`;

  //   // Make an HTTP GET request to the backend
  //   axios.get(apiUrl)
  //     .then((response) => {
  //       // Set the tickets in the state with the data received from the backend
  //       setTickets(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  console.log(tickets);

  //handle selection of tickets (multiselect checkbox)
  const [numTicketsSelected, setNumTicketsSelected] = useState(1);

  const [selectedTickets, setSelectedTickets] = useState([]);
  useEffect(() => {
    console.log("selectedtickets:", selectedTickets);
  }, [selectedTickets]);
  
  const handleSelectTickets = (ticket, isChecked) => {
    if (isChecked) {
      setSelectedTickets((prevSelectedTickets) => [
        ...prevSelectedTickets,
        ticket,
      ]);
      setNumTicketsSelected(numTicketsSelected + 1);
    } else {
      setSelectedTickets((prevSelectedTickets) =>
        prevSelectedTickets.filter((item) => item.ticketID !== ticket.ticketID)
      );
      setNumTicketsSelected(numTicketsSelected - 1);
    }
  };

  //modal 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
                <TableHead className="font-semibold w-[300px]">Order Information</TableHead>
                <TableHead className="font-semibold">Tickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getOrders.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <p><span className='font-semibold'>Order No: </span>{item.orderID}</p>
                    <p><span className='font-semibold'>Order Date: </span>{item.orderDate}</p>

                    <p className='mt-6 font-semibold'>Purchase Information</p>
                    <p><span>{item.eventTitle}</span></p>
                    <p><CalendarIcon className="h-4 w-4 inline-block mx-1" /><span>{item.eventDate}</span></p>
                    <p><IoLocationOutline size={20} className='inline-block' /><span>{item.eventVenue}</span></p>


                    <div className='grid grid-cols-2 mt-6'>
                      <p className='font-semibold'>Tickets Category:</p>
                      <p>{item.ticketCat}</p>
                      <span className='font-semibold'>Standard:</span>
                      <span>${item.price}</span>
                    </div>

                    <div className='grid grid-cols-2 mt-6'>
                      <p className='font-semibold'>Tickets Quantity:</p>
                      <p>{item.ticketQuantity} ticket(s)</p>
                      <p className='font-semibold'>Total:</p>
                      <p>${item.ticketQuantity * item.price}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTicketsWithSeat.map((item, index) => (
                      <div className='flex items-center' key={index}>
                        <Checkbox handleSelect={handleSelectTickets} ticket={item} />
                        <div className="flex gap-2">

                        </div>
                        <Link href={`/account/tickets/${item.ticketID}`}>
                          <TicketCard category={item.category} section={item.section} row={item.row} seatNo={item.seatNo} />
                        </Link>

                      </div>
                    ))}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='flex flex-1 justify-center'>
        <div className='mt-28 w-72 h-56 border border-[#B4C1DB] rounded p-6'>
          <p>{numTicketsSelected} tickets selected</p>
          <p className='font text-sm text-[#1F6EB7] mt-4'>To make direct transfer of tickets</p>
          <button className='w-24 text-sm border border-[#B4C1DB] bg-white rounded my-1 p-1'>Transfer</button>

          <p className='font text-sm text-[#1F6EB7] mt-4'>To resell your unwanted tickets</p>
          <button onClick={handleOpen} className='w-24 text-sm border border-[#B4C1DB] bg-white rounded my-1 p-1'>Resell</button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className='absolute overflow-y-scroll top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[800px] h-[400px] bg-white rounded-sm'>
              <div className="flex flex-1 justify-center p-10">
                <div>
                  {selectedTickets.length === 0 ? (<div>No tickets have been selected</div>) : (
                    <div>
                      <p>You have selected these ticket(s) to resell</p>

                      {selectedTickets.map((item, index) => {
                        return (
                          <div className='grid grid-cols-2 w-[500px]' key={index}>
                            <div className='flex justify-center flex-col w-3/4'>
                              <p className='font-bold'>Taylor Swift The Eras Tour in Singapore </p>
                              <p className='flex items-center'><CalendarIcon/>8 March 2024</p>
                              <p className='flex items-center'><IoLocationOutline/>National Stadium</p>
                            </div>
                            <div className='w-1/4'>
                              <TicketCard category={item.category} section={item.section} row={item.row} seatNo={item.seatNo} />
                            </div>
                          </div>
                          )
                      })}

                      <div className='flex justify-center mt-2'>
                        <button className='border border-amber-300 rounded-sm px-4 py-1 mr-4 text-sm' onClick={handleClose}>Cancel</button>
                        <Link href="/account/resell-tickets">
                          <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Confirm </button>
                        </Link>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  )
}

export default MyTickets