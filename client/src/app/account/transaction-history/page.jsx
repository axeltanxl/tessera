'use client'
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
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
import { useState, useEffect } from 'react'
import axios from 'axios'
import { formatDate, formatTime } from '@/lib/formatUtil';

const TransactionHistory = () => {
    const [details, setDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [runs, setRuns] = useState([]);
    const [events, setEvents] = useState([]);
    const [venues, setVenues] = useState([]);
    const [seats, setSeats] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [userID, setUserID] = useState();
    const token = localStorage.getItem('jwt');
    const fetchRunDetails = async (orderid) => {
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
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/orders/${orderid}/event/venue`, {
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
        } catch (e) {
            console.error(e);
        }
    }
    const fetchSeats = async (orderid) => {
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

    const fetchVenueByEventID = async (eventid) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/events/${eventid}/venue`, {
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

    const fetchRunDetailsForTicketListing = async (ticketid) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/tickets/${ticketid}/events/runs`, {
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

    const fetchTicketListingDetails = async (ticketid) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/ticketListings/tickets/${ticketid}`, {
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
                    setUserID(userid);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchOrders = async (userid) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/${userid}/orders`, {
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
            } catch (e) {
                console.error(e);
            }
        }

        const fetchTransactions = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`http://localhost:8080/api/v1/transactionHistory`, {
                    method: 'GET',
                    headers
                });
                if (res.ok) {
                    // const fetchedTransactions = await res.json();
                    // setTransactions(fetchedTransactions);
                    // fetchedTransactions.map((item, index) => {
                    //     const obj = fetchRunDetailsForTicketListing(item.ticketID);
                    // })
                    const fetchedTransactions = await res.json();
                    setTransactions(fetchedTransactions);

                    const mergedTransactions = [];
                    await Promise.all(
                        fetchedTransactions.map(async (item, index) => {
                            const runDetails = await fetchRunDetailsForTicketListing(item.ticketID);
                            const ticketListingDetails = await fetchTicketListingDetails(item.ticketID);
                            const mergedItem = { ...item, runDetails, ticketListingDetails };
                            mergedTransactions.push(mergedItem);
                        })

                    );

                    const mergedTransactionsWithVenue = [];
                    await Promise.all(mergedTransactions.map(async (item, index) => {
                        if (item.runDetails !== undefined) {
                            const venueDetails = await fetchVenueByEventID(item.runDetails.event.eventID);
                            console.log("venue ee:", venueDetails);
                            const mergeVenue = { ...item, venueDetails };
                            mergedTransactionsWithVenue.push(mergeVenue);
                        }
                    }))
                    setTransactions(mergedTransactionsWithVenue);


                    // console.log("merged:", mergedTransactions);
                } else {
                    console.error("API request failed");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        fetchDetails();
        fetchTransactions();
    }, []);
    console.log("transactions:", transactions)
    return (
        <section className='flex mt-10'>
            <div className='mr-20 ml-10'>
                <SideNav activeTab={3} />
            </div>

            <div>
                <p className='text-xl mb-4 font-semibold'>Transaction History</p>
                <Tabs defaultValue="purchases" className="w-[1000px]">
                    <TabsList className="grid grid-cols-3">
                        <TabsTrigger className='w-full data-[state=active]:bg-black data-[state=active]:text-white' value="purchases">Purchases</TabsTrigger>
                        <TabsTrigger className='w-full data-[state=active]:bg-black data-[state=active]:text-white' value="marketplace">Marketplace</TabsTrigger>
                        <TabsTrigger className='w-full data-[state=active]:bg-black data-[state=active]:text-white' value="direct transfers">Direct transfers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="purchases">
                        <p className='font text-sm text-[#1F6EB7] my-1'>Records of your purchases bought directly from concert organiser</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold w-fit">Order No.</TableHead>
                                    <TableHead className="font-semibold">Order Date</TableHead>
                                    <TableHead className="font-semibold">Information</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.length > 0 ? orders.map((item, index) => {
                                    const event = events[index];
                                    let pricePerCategory;
                                    if (event !== undefined) {
                                        pricePerCategory = JSON.parse(event.pricePerCategory);
                                    }
                                    const category = item.ticketCategory;
                                    let price;
                                    if (category !== undefined && pricePerCategory !== undefined) {
                                        price = pricePerCategory[category];
                                    }
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{item.orderID}</TableCell>
                                            <TableCell>{formatDate(item.date)}</TableCell>
                                            <TableCell>
                                                <p><span>{events[index] == undefined ? "" : events[index].name}</span></p>
                                                <p><CalendarIcon className="h-4 w-4 inline-block mx-1" /><span>{runs[index] == undefined ? "" : formatDate(runs[index].date) + " " + formatTime(runs[index].startTime) + " - " + formatTime(runs[index].endTime)}</span></p>
                                                <p><IoLocationOutline size={20} className='inline-block' /><span>{venues[index] == undefined ? "" : venues[index].name}</span></p>


                                                <div className='grid grid-cols-2 mt-6'>
                                                    <p className='font-semibold'>Tickets Category:</p>
                                                    <p>{item.ticketCategory}</p>
                                                    <span className='font-semibold'>Standard:</span>
                                                    <span>${price}</span>
                                                </div>

                                                <div className='grid grid-cols-2 mt-6'>
                                                    <p className='font-semibold'>Tickets Quantity:</p>
                                                    <p>{item.ticketQuantity}</p>
                                                    <p className='font-semibold'>Total:</p>
                                                    <p>${price * item.ticketQuantity}</p>
                                                </div>

                                                <div className='mt-6'>
                                                    <p className='font-semibold'>Tickets purchased:</p>
                                                    <div className="flex flex-col">
                                                        {seats[index] == undefined ? "" : seats[index].map((item, i) => {
                                                            return (
                                                                <div key={i} className="p-2 flex w-[320px] bg-white border border-[#B4C1DB] rounded my-2">Category {item.category}, Zone {item.section},Row {item.row}, Seat {item.seatNo}</div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>)
                                }) : (<></>)}

                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="marketplace">
                        <p className='font text-sm text-[#1F6EB7] my-1'>Records of your buy and sell transactions on Marketplace</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold w-fit">Transaction No.</TableHead>
                                    <TableHead className="font-semibold">Transaction Date</TableHead>
                                    <TableHead className='font-semibold'>Buy/Sell</TableHead>
                                    <TableHead className="font-semibold">Information</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.length > 0 ? (
                                    transactions.map((item, index) => {
                                        return (
                                            <TableRow key={item.transactionID}>
                                                <TableCell>{item.transactionID}</TableCell>
                                                <TableCell>{formatDate(item.date)}</TableCell>
                                                <TableCell>{
                                                    item.buyerID === userID ? "Bought from Marketplace" : "Resold on Marketplace"
                                                }</TableCell>
                                                <TableCell>
                                                    <p><span>{item.runDetails?.event.name}</span></p>
                                                    <p><CalendarIcon className="h-4 w-4 inline-block mx-1" /><span>{formatDate(item.runDetails?.run.date)} {formatTime(item.runDetails?.run.startTime)} - {formatTime(item.runDetails?.run.endTime)}</span></p>
                                                    <p><IoLocationOutline size={20} className='inline-block' /><span>{item.venueDetails?.name}</span></p>


                                                    <div className='grid grid-cols-2 mt-6'>
                                                        <p className='font-semibold'>Tickets Category:</p>
                                                        <p>ticket cat</p>
                                                        <span className='font-semibold'>Standard:</span>
                                                        <span>${item.ticketListingDetails !== undefined ? item.ticketListingDetails[0].price : ""}</span>
                                                    </div>

                                                    <div className='grid grid-cols-2 mt-6'>
                                                        <p className='font-semibold'>Tickets Quantity:</p>
                                                        <p>1</p>
                                                        <p className='font-semibold'>Total:</p>
                                                        <p>${item.ticketListingDetails?.price}</p>
                                                    </div>

                                                    <div className='mt-6'>
                                                        <p className='font-semibold'>Tickets purchased:</p>
                                                        <div className="flex flex-col">
                                                            {seats[index] == undefined ? "" : seats[index].map((item, i) => {
                                                                return (
                                                                    <div key={i} className="p-2 flex w-[320px] bg-white border border-[#B4C1DB] rounded my-2">Category {item.category}, Zone {item.section},Row {item.row}, Seat {item.seatNo}</div>
                                                                )
                                                            })} 
                                                        </div>
                                                    </div>

                                                </TableCell>
                                            </TableRow>)
                                    })
                                ) : (<></>)}

                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="direct transfers">
                        <p className='font text-sm text-[#1F6EB7] my-1'>View your ticket transfer history here.
                            Your transferred tickets will show as ‘Transfer in progress’. You may cancel the transfer before your recipient accepts the tickets. Once accepted, the ticket(s) will show as Transferred and can no longer be accessed in your account.</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Transaction Status</TableHead>
                                    <TableHead className="font-semibold">Transfer/Receive</TableHead>
                                    <TableHead className="font-semibold">Transfer Date</TableHead>
                                    <TableHead className="font-semibold">Information</TableHead>
                                    <TableHead className="font-semibold">Transfer Code</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Transfer in progress</TableCell>
                                    <TableCell>Transfer</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                        <p><span>event title</span></p>
                                        <p><CalendarIcon className="h-4 w-4 inline-block mx-1" /><span>event date</span></p>
                                        <p><IoLocationOutline size={20} className='inline-block' /><span>event venue</span></p>


                                        <div className='grid grid-cols-2 mt-6'>
                                            <p className='font-semibold'>Tickets Category:</p>
                                            <p>ticket cat</p>
                                            <span className='font-semibold'>Standard:</span>
                                            <span>$price</span>
                                        </div>

                                        <div className='grid grid-cols-2 mt-6'>
                                            <p className='font-semibold'>Tickets Quantity:</p>
                                            <p>_ticket qty_ ticket(s)</p>
                                            <p className='font-semibold'>Total:</p>
                                            <p>$total paid</p></div>
                                    </TableCell>
                                    <TableCell>12345</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </div>

        </section>
    )
}

export default TransactionHistory;