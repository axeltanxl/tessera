'use client';
import Head from 'next/head';
import { SlArrowRight, SlArrowDown } from 'react-icons/sl';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MarketplaceListingDetails = () => {
    const maxTixQty = 4;
    const [quantity, setQuantity] = useState(0);
    return (
        <section className="bg-primary h-full">
            <Head>
                <title>Tessera - Marketplace</title>
            </Head>
            <div className="flex flex-col md:mx-2 xl:mx-20">
                <p className="text-xl mb-4 mt-10 font-semibold">Marketplace</p>
                <div className='h-full rounded-sm bg-[#F5F7FB]'>
                    <div className='flex mt-4 md:mt-10 flex-col lg:flex-row'>
                        <div className='mx-4 md:mx-10'>
                            <img
                                src={"/image-9.jpg"}
                                alt="card-image"
                                className="object-contain lg:h-[300px]"
                            />
                            <div className='my-4 text-sm items-center hidden lg:flex'>
                                View concert event details <SlArrowRight size={12} className='ml-1' />
                            </div>
                            <div className='my-4 text-sm items-center hidden lg:flex'>
                                View Seatmap <SlArrowRight size={12} className='ml-1' />
                            </div>
                        </div>
                        <div className='flex flex-col mx-4 md:mx-10 mt-2 lg:mt-0'>
                            <div className='text-lg'>Talyor Swift The Eras Tour</div>
                            <div className='text-lg'>8 March 2024</div>
                            <div className='mt-4'>
                                <Table className="hidden sm:block">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="font-semibold">Ticket Type</TableHead>
                                            <TableHead className="font-semibold">Section</TableHead>
                                            <TableHead className="font-semibold">Price</TableHead>
                                            <TableHead className="font-semibold">Quantity</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Standard</TableCell>
                                            <TableCell>CAT 1</TableCell>
                                            <TableCell>$300</TableCell>
                                            <TableCell className="text-right">

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className='border px-2 py-1 rounded-sm border-[#B4C1DB] flex items-center justify-between bg-white outline-none w-[140px]'>
                                                        {quantity === 0 ? <span>Please select</span> : <span>{quantity}</span>}
                                                        <SlArrowDown /> </DropdownMenuTrigger>
                                                    <DropdownMenuContent className='bg-white'>
                                                        <DropdownMenuItem onClick={() => setQuantity(0)} className="focus:bg-[#F5F7FB]">Please select</DropdownMenuItem>
                                                        {Array.from({ length: maxTixQty }).map((_, i) => (
                                                            <DropdownMenuItem onClick={() => setQuantity(i + 1)} key={i} className="focus:bg-[#F5F7FB]">
                                                                {i + 1}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                <div className='grid grid-cols-2 sm:hidden'>
                                    <span className="font-semibold text-sm">Ticket Type</span>
                                    <span className="font-medium text-sm mb-2">Standard</span>

                                    <span className="font-semibold text-sm">Section</span>
                                    <span className="font-medium text-sm mb-2">CAT 1</span>

                                    <span className="font-semibold text-sm">Price</span>
                                    <span className="font-medium text-sm mb-2">$300</span>

                                    <span className="font-semibold text-sm">Quantity</span>
                                    <span className="font-medium text-sm mb-2">
                                    <DropdownMenu>
                                                    <DropdownMenuTrigger className='border px-2 py-1 rounded-sm border-[#B4C1DB] flex items-center justify-between bg-white outline-none w-[140px]'>
                                                        {quantity === 0 ? <span>Please select</span> : <span>{quantity}</span>}
                                                        <SlArrowDown /> </DropdownMenuTrigger>
                                                    <DropdownMenuContent className='bg-white'>
                                                        <DropdownMenuItem onClick={() => setQuantity(0)} className="focus:bg-[#F5F7FB]">Please select</DropdownMenuItem>
                                                        {Array.from({ length: maxTixQty }).map((_, i) => (
                                                            <DropdownMenuItem onClick={() => setQuantity(i + 1)} key={i} className="focus:bg-[#F5F7FB]">
                                                                {i + 1}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                    </span>
                                </div>

                                <div className='flex mt-8 mb-4'>
                                    <button
                                        ripple={false}
                                        fullWidth={false}
                                        className="bg-[#FAD749] px-8 py-2 text-sm rounded shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                    >Best Available
                                    </button>
                                </div>
                                <div className='my-4 text-sm items-center flex lg:hidden'>
                                    View concert event details <SlArrowRight size={12} className='ml-1' />
                                </div>
                                <div className='my-4 text-sm items-center flex lg:hidden'>
                                    View Seatmap <SlArrowRight size={12} className='ml-1' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default MarketplaceListingDetails