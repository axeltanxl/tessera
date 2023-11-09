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
import Checkbox from '@/components/ui/checkbox';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Cookies from 'js-cookie';
import { formatDate, formatTime } from '@/lib/formatUtil';
import TicketCardWithTicketID from '@/components/ui/cards/TicketCardWithTicketID';
import SelectedTicket from '@/components/ui/cards/SelectedTicket';

const createAccount = async (action) => {

  const res = await axios.post("/api/stripeTransaction", { "jwt": localStorage.getItem("jwt") }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("stripe onboard url", res.status)
  if (res.status === 201) {
    const { stripeSignUp } = res.data
    window.location.assign(stripeSignUp);
  } else if (res.status === 200) {
    action();
  }
}
const MyTickets = () => {


  const [details, setDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [runs, setRuns] = useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [seats, setSeats] = useState([]);
  const [ marketplaceTix, setMarketPlaceTix ] = useState([]);
  const fetchRunDetails = async (orderid) => {
    const token = Cookies.get("jwt_spring");
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/orders/${orderid}/run`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (e) {
      console.error(e);
    }
  }
  const fetchEventDetails = async (orderid) => {
    const token = Cookies.get("jwt_spring");
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/orders/${orderid}/event`, {
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
    } catch (e) {
      console.error(e);
    }
  }
  const fetchVenueDetails = async (orderid) => {
    const token = Cookies.get("jwt_spring");
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/orders/${orderid}/event/venue`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (e) {
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

  const addTicketListing = async (quantity, runID, ticketID) => {
    const token = Cookies.get("jwt_spring");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/runs/${runID}/tickets/${ticketID}/ticketListings`,
        {
          quantity: 1,
          runID: runID,
          ticketID: ticketID,
          listingDate: Date.now()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      if (response.status === 201) {
        return response.data;

      } else if (response.status === 400) {
        alert("You have already listed this ticket on marketplace")
      } else {
        throw new Error('Failed to create ticket listing');
      }

    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("You have already listed this ticket on the marketplace.");
      } else {
        console.error(err);
      }
    }
  }
 
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
          fetchOrders(userid);
          findMarketPlaceTickets()
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const findMarketPlaceTickets = async () => {
        const response = await axios.get(`/api/ticketing`)
        if (response.status === 200) {
            console.log(response.data.tickets);
            const tickets = JSON.parse(response.data.tickets)
            console.log(tickets);
            setMarketPlaceTix(tickets);
        }
      }

      
    const fetchOrders = async (userid) => {
      const token = Cookies.get("jwt_spring");
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/${userid}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {

          setOrders(response.data);
          // console.log("orders: ", response.data);
          const tempOrder = response.data

          const runpromises = tempOrder.map(order => fetchRunDetails(order.orderID));
          const runresults = await Promise.all(runpromises);
          setRuns(runresults);
          // console.log("runs: ", runresults);

          const eventpromises = tempOrder.map(order => fetchEventDetails(order.orderID));
          const eventresults = await Promise.all(eventpromises);
          setEvents(eventresults);
          // console.log("event: ", eventresults);

          const venuepromises = tempOrder.map(order => fetchVenueDetails(order.orderID));
          const venueresults = await Promise.all(venuepromises);
          setVenues(venueresults);
          // console.log("venue: ", venueresults);

          const seatpromises = tempOrder.map(order => fetchSeats(order.orderID));
          const seatresults = await Promise.all(seatpromises);
          setSeats(seatresults);
          // console.log("seats: ", seatresults);

        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (e) {
        console.error(e);
      }
    }


    fetchDetails();
  }, []);



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

  // function to find the event run details for the specific selected ticket
  function findOrderIndex(ticketID) {
    for (let i = 0; i < orders.length; i++) {
      const secArray = orders[i].tickets;
      for (let j = 0; j < secArray.length; j++) {
        if (secArray[j].ticketID === ticketID) {
          return i;
        }
      }
    }
    return -1; // seatID not found in the orders array
  }

  //handle reselling
  const handleResell = () => {

    for (let i = 0; i < selectedTickets.length; i++) {
      const ticketIndex = selectedTickets[i].ticketID;
      const orderIndex = (findOrderIndex(ticketIndex))
      const runIndex = runs[orderIndex].runID
      addTicketListing(1, runIndex, ticketIndex)
    }
  }

  // console.log("EVENTS: ", events);
  // console.log("RUNS: ", runs);
  // console.log("SEATS: ", seats);
  // console.log("VENUE: ", venues);
  // console.log("ORDERS: ", orders);



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
            {/* <TableHeader>
              <TableRow>
                <TableHead className="font-semibold w-[300px]"></TableHead>
                <TableHead className="font-semibold">Tickets</TableHead>
              </TableRow>
            </TableHeader> */}
            <TableBody>
                <TableRow>
                    <TableHead className="font-semibold">Tickets from marketplace</TableHead>
                </TableRow>
                
                {marketplaceTix.map((marketplaceTicket) => {
                    console.log(marketplaceTicket)
                    const { ticketID } = marketplaceTicket;
                    return (
                    <TableRow key={ticketID} >
                        <TableCell>
                        <div className='flex items-center' key={ticketID}>
                            <Link href={`/account/tickets/${ticketID}`}>
                                <TicketCardWithTicketID ticketID={ticketID}/>
                            </Link>
                        </div>
                        </TableCell>
                    </TableRow>
                    )
                })}

                <TableRow>
                    <TableHead className="font-semibold">Tickets</TableHead>
                </TableRow>

              {orders.map((item, index) => {
                    console.log(item.tickets);

                return (
                  <TableRow key={index} >
                    <TableCell className="font-medium">
                      <p className='mt-6 font-semibold'>{events[index] == undefined ? "" : events[index].name}</p>
                      <br />
                      <p><CalendarIcon className="h-4 w-4 inline-block mx-1" /><span>{runs[index] == undefined ? "" : formatDate(runs[index].date) + " " + formatTime(runs[index].startTime) + " - " + formatTime(runs[index].endTime)}</span></p>
                      <p><IoLocationOutline size={20} className='inline-block' /><span>{venues[index] == undefined ? "" : venues[index].name}</span></p>

                    </TableCell>
                    <TableCell>
                      {item.tickets.map((tix, tIndex) => { 
                        const beenToMarketPlace = tix.transactions.length > 0
                        // console.log(beenToMarketPlace);
                        return (beenToMarketPlace ? 
                        <div></div> 
                        : 
                        <div className='flex items-center' key={tIndex}>
                          <Checkbox handleSelect={handleSelectTickets} ticket={tix} />
                          <div className="flex gap-2">

                          </div>
                          <Link href={`/account/tickets/${tix.ticketID}`}>
                            <TicketCardWithTicketID ticketID={tix.ticketID}/>
                          </Link>

                        </div>)
                      })}
                      {/* {seats[index] == undefined ? "" : seats[index].map((item, index) => {
                        console.log("Seats:", item)
                        return (
                          <div className='flex items-center' key={index}>
                            <Checkbox handleSelect={handleSelectTickets} ticket={item} />
                            <div className="flex gap-2">

                            </div>
                            <Link href={`/account/tickets/${item.seatID}`}>
                              <TicketCard category={item.category} section={item.section} row={item.row} seatNo={item.seatNo} />
                            </Link>

                          </div>
                        )
                      })} */}
                    </TableCell>

                  </TableRow>
                )
              })}
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
          <button className='w-24 text-sm border border-[#B4C1DB] bg- white rounded my-1 p-1'
            onClick={() => { 
              createAccount(handleOpen) 
              // handleOpen();
            }}
          >Resell</button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className='absolute overflow-y-scroll top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[800px] h-[400px] bg-white rounded-sm'>
              <div className="flex flex-1 justify-center p-6">
                <div>
                  {selectedTickets.length === 0 ? (<div>No tickets have been selected</div>) : (
                    <div>
                      <p>You have selected these ticket(s) to resell</p>

                      {selectedTickets.map((item, index) => {
                        console.log("item:", item.ticketID) 
                        return(<SelectedTicket ticketID={item.ticketID} key={index}/>)
                        // console.log("item:", item, " order index:", findOrderIndex(item.tickets[0].ticketID));
                      //   const orderIndex = findOrderIndex(item.tickets[0].ticketID);
                      //   return (
                      //     <div className='grid grid-cols-2 gap-x-4' key={index}>
                      //       <div className='flex justify-center flex-col'>
                      //         <p className='font-bold'>{events[orderIndex].name}</p>
                      //         <p className='flex items-center'><CalendarIcon />{formatDate(runs[orderIndex].date)} {formatTime(runs[orderIndex].startTime)} - {formatTime(runs[orderIndex].endTime)}</p>
                      //         <p className='flex items-center'><IoLocationOutline />National Stadium</p>
                      //       </div>
                      //       <div className=''>
                      //         <TicketCard category={item.category} section={item.section} row={item.row} seatNo={item.seatNo} />
                      //       </div>
                      //     </div>
                      //   )
                      })
                      }

                      <div className='flex justify-center mt-2'>
                        <button className='border border-amber-300 rounded-sm px-4 py-1 mr-4 text-sm' onClick={handleClose}>Cancel</button>
                        <Link href="/account/resell-tickets">
                          <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm' onClick={handleResell}>Confirm </button>
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