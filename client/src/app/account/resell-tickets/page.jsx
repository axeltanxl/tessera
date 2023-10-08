'use client'
import React from 'react'
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

const ResellTickets = () => {
    //modal 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                <TableHead className="font-semibold w-[400px]">Ticket Information</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            <TableRow>
                                <TableCell className='flex'>
                                    <p>Taylor Swift The Eras Tour in Singapore</p>
                                    <TicketCard category={"A"} section={"B"} row={"18"} seatNo={"22"} />
                                </TableCell>
                                <TableCell>
                                    Listed at $200
                                </TableCell>
                                <TableCell>
                                    <button onClick={handleOpen} className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Set price</button>
                                    <button className='bg-black text-white rounded-sm px-4 py-1 ml-4 text-sm'>Remove</button>
                                </TableCell>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div className='absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[500px] h-[350px] bg-white rounded-sm'>
                                        <div className="flex flex-col flex-1 p-10">
                                            <div className='grid grid-cols-2 w-[450px]'>
                                                <div className='flex justify-center flex-col w-3/4'>
                                                    <p className='font-bold'>Taylor Swift The Eras Tour in Singapore </p>
                                                    <p className='flex items-center'><CalendarIcon />8 March 2024</p>
                                                    <p className='flex items-center'><IoLocationOutline />National Stadium</p>
                                                </div>
                                                <div className='w-1/4'>
                                                    <TicketCard category={"A"} section={"PA"} row={"18"} seatNo={"22"} />
                                                </div>
                                            </div>
                                            <p className='mt-1 font-bold'>Original price: $200</p>
                                            <div className='flex mt-4'>
                                                <p className='font-bold'>Input resale price:</p>
                                                <p className='ml-4'>$</p>
                                                <input type="price" placeholder='e.g. 200' className='border border-[#B4C1DB] rounded-sm px-2'>
                                                </input>
                                            </div>

                                        </div>
                                        <div className='flex justify-center mt-1'>
                                            <button className='border border-amber-300 rounded-sm px-4 py-1 mr-4 text-sm' onClick={handleClose}>Cancel</button>
                                            <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Resell </button>
                                        </div>
                                    </div>
                                </Modal>
                            </TableRow>
                            <TableRow>
                                <TableCell className='flex'>
                                    <p>Taylor Swift The Eras Tour in Singapore</p>
                                    <TicketCard category={"A"} section={"B"} row={"18"} seatNo={"23"} />
                                </TableCell>
                                <TableCell>
                                    Not listed
                                </TableCell>
                                <TableCell>
                                    <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Set price</button>
                                    <button className='bg-black text-white rounded-sm px-4 py-1 ml-4 text-sm'>Remove</button>
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        </section>
    )
}

export default ResellTickets;