'use client';
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'
import { SlArrowLeft } from 'react-icons/sl';
import { CalendarIcon } from "@radix-ui/react-icons";
import { IoLocationOutline } from 'react-icons/io5';
const Ticket = () => {
    return (
        <section className='flex mt-10'>
            <div className='mr-20 ml-10'>
                <SideNav activeTab={0} />
            </div>
            <div>
                <p className="text-xl mb-4 font-semibold">My Tickets</p>
                <p className='font text-sm text-[#1F6EB7]'>
                    <SlArrowLeft size={12} className='inline-block mr-1' />
                    View All Tickets
                </p>
                <div className='mt-8 relative'>
                    {/* Ticket outline Card*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="408" viewBox="0 0 300 408" fill="none">
                        <mask id="path-1-inside-1_485_212" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 9.99999C0 4.47715 4.47715 0 10 0H290C295.523 0 300 4.47715 300 10V204.414C299.046 204.144 298.04 204 297 204C290.925 204 286 208.925 286 215C286 221.075 290.925 226 297 226C298.04 226 299.046 225.856 300 225.586V398C300 403.523 295.523 408 290 408H10C4.47716 408 0 403.523 0 398V226C6.07513 226 11 221.075 11 215C11 208.925 6.07513 204 0 204V9.99999Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 9.99999C0 4.47715 4.47715 0 10 0H290C295.523 0 300 4.47715 300 10V204.414C299.046 204.144 298.04 204 297 204C290.925 204 286 208.925 286 215C286 221.075 290.925 226 297 226C298.04 226 299.046 225.856 300 225.586V398C300 403.523 295.523 408 290 408H10C4.47716 408 0 403.523 0 398V226C6.07513 226 11 221.075 11 215C11 208.925 6.07513 204 0 204V9.99999Z" fill="white" />
                        <path d="M300 204.414L299.728 205.376L301 205.736V204.414H300ZM300 225.586H301V224.264L299.728 224.624L300 225.586ZM0 226V225H-1V226H0ZM0 204H-1V205H0V204ZM10 -1C3.92487 -1 -1 3.92486 -1 9.99999H1C1 5.02943 5.02944 1 10 1V-1ZM290 -1H10V1H290V-1ZM301 10C301 3.92487 296.075 -1 290 -1V1C294.971 1 299 5.02944 299 10H301ZM301 204.414V10H299V204.414H301ZM297 205C297.947 205 298.862 205.131 299.728 205.376L300.272 203.452C299.231 203.157 298.133 203 297 203V205ZM287 215C287 209.477 291.477 205 297 205V203C290.373 203 285 208.373 285 215H287ZM297 225C291.477 225 287 220.523 287 215H285C285 221.627 290.373 227 297 227V225ZM299.728 224.624C298.862 224.869 297.947 225 297 225V227C298.133 227 299.231 226.843 300.272 226.548L299.728 224.624ZM301 398V225.586H299V398H301ZM290 409C296.075 409 301 404.075 301 398H299C299 402.971 294.971 407 290 407V409ZM10 409H290V407H10V409ZM-1 398C-1 404.075 3.92488 409 10 409V407C5.02944 407 1 402.971 1 398H-1ZM-1 226V398H1V226H-1ZM10 215C10 220.523 5.52285 225 0 225V227C6.62742 227 12 221.627 12 215H10ZM0 205C5.52285 205 10 209.477 10 215H12C12 208.373 6.62742 203 0 203V205ZM-1 9.99999V204H1V9.99999H-1Z" fill="#B4C1DB" mask="url(#path-1-inside-1_485_212)" />
                    </svg>
                    <div className='absolute top-0 left-0'>
                        <div className='p-4'>
                            <div className='my-2'>
                                <p className='font-semibold'>Taylor Swift The Eras Tour in Singapore</p>
                                <p><CalendarIcon className="h-4 w-4 inline-block mx-1" /><span className='text-sm'>8 March 2024</span></p>
                                <p><IoLocationOutline size={20} className='inline-block' /><span className='text-sm'>National Stadium</span></p>
                            </div>
                            <hr></hr>
                            <div className='flex items-center my-2'>
                                <p className='text-sm'><span className='font-bold text-[#1F6EB7]'>CAT </span>1 Ticket</p>
                            </div>
                            <hr></hr>
                            <div className='flex items-center my-2'>
                                <p className='text-sm'><span className='font-bold text-[#1F6EB7]'>CAT </span>1 Ticket</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Ticket