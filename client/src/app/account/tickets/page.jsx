'use client'
import React from 'react'
import { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox"

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
  const [numTicketsSelected, setNumTicketsSelected] = useState(0);
  const handleSelectTickets = (checked) => {
    checked ? setNumTicketsSelected(numTicketsSelected + 1) : setNumTicketsSelected(numTicketsSelected - 1);
    console.log("number of tickets selected:" + numTicketsSelected);
  }
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
                      <TicketCard category={item.category} section={item.section} row={item.row} seatNo={item.seatNo}/>
                      <Checkbox handleSelect={handleSelectTickets}/>
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
          <p>0 tickets selected</p>
          <p className='font text-sm text-[#1F6EB7] mt-4'>To make direct transfer of tickets</p>
          <button className='w-24 text-sm border border-[#B4C1DB] bg-white rounded my-1 p-1'>Transfer</button>

          <p className='font text-sm text-[#1F6EB7] mt-4'>To resell your unwanted tickets</p>
          <button className='w-24 text-sm border border-[#B4C1DB] bg-white rounded my-1 p-1'>Resell</button>
        </div>
      </div>
    </section>
  )
}

export default MyTickets