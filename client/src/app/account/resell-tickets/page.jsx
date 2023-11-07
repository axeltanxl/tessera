'use client'
import React, { useEffect, useState } from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TicketCard from '@/components/ui/cards/TicketCard';
import Modal from '@mui/material/Modal';
import { CalendarIcon } from "@radix-ui/react-icons";
import { IoLocationOutline } from 'react-icons/io5';
import axios from "axios";
import { formatDate, formatTime } from '@/lib/formatUtil';
import ResellModal from '@/components/ui/modals/ResellModal';
import DeleteModal from '@/components/ui/modals/DeleteModal';

const ResellTickets = () => {
    //modal 
    const [open, setOpen] = React.useState(false);
    const handleOpen = (item) => {
        setSelectedItem(item)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    // modal data
    const [selectedItem, setSelectedItem] = useState(null);


    //ticketlistings
    const [ticketListings, setTicketListings] = useState([]);
    const token = localStorage.getItem('jwt');
    const [hasUpdate, setHasUpdate] = useState(false);
    const fetchVenueDetails = async (eventid) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/events/${eventid}/venue`, {
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

    const handleChange = () => {
        setHasUpdate(false);
    }

    
    //delete confirmation modal
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const handleOpenDeleteModal = (item) => {
        setSelectedItem(item)
        setOpenDeleteModal(true)
    };
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/accountDetails`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const userid = response.data.userID;
                    fetchTicketListingsByUserID(userid);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchTicketListingsByUserID(userID) {

            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/${userID}/listedTickets`, {
                    method: 'GET',
                    headers,
                });
                if (res.ok) {
                    const result = await res.json();
                    setTicketListings(result);
                    setHasUpdate(true);
                    if (hasUpdate === true) {
                        const ticketListingsWithVenue = await Promise.all(ticketListings.map(async (item) => {
                            const eventid = item.event.eventID;
                            const venueData = await fetchVenueDetails(eventid);
                            return { ...item, venue: venueData };
                        }))
                        setTicketListings(ticketListingsWithVenue);
                    }
                } else {
                    console.error("API request failed.");
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchDetails();
    }, [hasUpdate])

    // console.log("ticketlistings:", ticketListings);
    return (
        <section className='flex mt-10'>
            <div className='mr-20 ml-10'>
                <SideNav activeTab={1} />
            </div>
            <div>
                <p className='text-xl mb-4 font-semibold'>Resell Tickets</p>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold w-[480px]">Ticket Information</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ticketListings.length > 0 ? (ticketListings.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className='flex'>
                                        <div className="pr-4">
                                            <p>{item.event.name}</p>
                                            <p><CalendarIcon className="h-4 w-4 inline-block mx-1" /><span>{formatDate(item.run.date)} {formatTime(item.run.startTime)} - {formatTime(item.run.endTime)}</span></p>
                                            <p><IoLocationOutline size={20} className='inline-block' /><span>{item.venue?.name}</span></p>
                                        </div>
                                        <TicketCard category={item.seat.category} section={item.seat.section} row={item.seat.row} seatNo={item.seat.seatNo} />
                                    </TableCell>
                                    <TableCell>
                                        {item.ticketList.status === "Not Listed" ? (<p>{item.ticketList.status}</p>) : (<p>{item.ticketList.status} at ${item.ticketList.price / 100}</p>)}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => handleOpen(item)} className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Set price</button>
                                        <button onClick={() => handleOpenDeleteModal(item)} className='bg-black text-white rounded-sm px-4 py-1 ml-4 text-sm'>Remove</button>
                                    </TableCell>
                                    <ResellModal item={selectedItem} handleClose={handleClose} open={open} handleUpdateInPrice={handleChange} />
                                    <DeleteModal item={selectedItem} handleCloseDeleteModal={handleCloseDeleteModal} openDeleteModal={openDeleteModal} handleDeleteListing={handleChange}/>
                                </TableRow>))
                            ) : (<></>)}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </section>
    )
}

export default ResellTickets;