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


const TransactionHistory = () => {
    return (
        <section className='flex mt-10'>
            <div className='mr-20 ml-10'>
                <SideNav activeTab={3} />
            </div>

            <div>
                <p className='text-xl mb-4 font-semibold'>Transaction History</p>
                <Tabs defaultValue="purchases" className="w-[700px]">
                    <TabsList className="grid grid-cols-3">
                        <TabsTrigger className='w-full data-[state=active]:bg-black data-[state=active]:text-white' value="purchases">Purchases</TabsTrigger>
                        <TabsTrigger className='w-full data-[state=active]:bg-black data-[state=active]:text-white' value="marketplace">Marketplace</TabsTrigger>
                        <TabsTrigger className='w-full data-[state=active]:bg-black data-[state=active]:text-white' value="direct transfers">Direct transfers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="purchases">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold w-fit">Order No.</TableHead>
                                    <TableHead className="font-semibold">Order Date</TableHead>
                                    <TableHead className="font-semibold">Information</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>12345</TableCell>
                                    <TableCell>14 October 2023, 2.20pm</TableCell>
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
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="marketplace">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold w-fit">Transaction No.</TableHead>
                                    <TableHead className="font-semibold">Transaction Date</TableHead>
                                    <TableHead className="font-semibold">Information</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>12345</TableCell>
                                    <TableCell>14 October 2023, 2.20pm</TableCell>
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
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="direct transfers">
                    <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Transfer Date</TableHead>
                                    <TableHead className="font-semibold">Information</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>14 October 2023, 2.20pm</TableCell>
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