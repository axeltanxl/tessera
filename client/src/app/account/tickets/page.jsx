'use client'
import React, { useEffect, useState } from 'react'
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
function MyTickets() {
  //fetching orders from backend
  // const [orders, setOrders] = useState([]);
  // const token = localStorage.getItem('jwt');

  // useEffect(() => {
  //   async function fetchData() {
  //     try {

  //       const headers = {
  //         Authorization: `Bearer ${token}`,
  //       };
  //       const res = await fetch(`http://localhost:8080/api/v1/users/1/orders`, {
  //         method: 'GET',
  //         headers,
  //       });
  //       if (res.ok) {
  //         const ordersData = await res.json();
  //         setOrders(ordersData);
  //       } else {
  //         console.error("API request failed.");
  //       }
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  // console.log("orders:", orders);

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
                  <p>You have selected these ticket(s) to resell</p>
                  <div className='grid grid-cols-2 w-[500px]'>
                    <div className='flex justify-center flex-col w-3/4'>
                      <p className='font-bold'>Taylor Swift The Eras Tour in Singapore </p>
                      <p className=''>8 March 2024</p>
                    </div>
                    <div className='w-1/4'>
                      <TicketCard category={"A"} section={"B"} row={"18"} seatNo={"22"} />
                    </div>

                    <div className='flex justify-center flex-col w-3/4'>
                      <p className='font-bold'>Taylor Swift The Eras Tour in Singapore </p>
                      <p className=''>8 March 2024</p>
                    </div>
                    <div className='w-1/4'>
                      <TicketCard category={"A"} section={"B"} row={"18"} seatNo={"22"} />
                    </div>
                    <div className='flex justify-center flex-col w-3/4'>
                      <p className='font-bold'>Taylor Swift The Eras Tour in Singapore </p>
                      <p className=''>8 March 2024</p>
                    </div>
                    <div className='w-1/4'>
                      <TicketCard category={"A"} section={"B"} row={"18"} seatNo={"22"} />
                    </div>
                  </div>
                  <div className='flex justify-center mt-2'>
                    <button className='border border-amber-300 rounded-sm px-4 py-1 mr-4 text-sm'>Cancel</button>
                    <Link href="/account/resell-tickets">
                      <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Confirm </button>
                    </Link>
                  </div>
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