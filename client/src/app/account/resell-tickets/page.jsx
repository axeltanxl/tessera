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
import TicketCard from '@/components/ui/cards/TicketCard'

const ResellTickets = () => {
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
                                    <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Set price</button>
                                    <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Remove</button>
                                </TableCell>

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
                                    <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm'>Remove</button>
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