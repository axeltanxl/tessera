'use client';
import React from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import { BsChat, BsThreeDotsVertical } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdLogout } from 'react-icons/md';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { isAuthenticated } from '@/lib/utils';

const menuItems = [
    {
        link: "/account/tickets",
        name: "My Tickets"
    },
    {
        link: "/account/resell-tickets",
        name: "Resell Tickets"
    },
    // {
    //     link: "/account/receive-transfer",
    //     name: "Receive Transfer"
    // },
    {
        link: "/account/transaction-history",
        name: "Transaction History"
    },
    {
        link: "/account/profile",
        name: "My Profile"
    }
]
export default function MyAccountDropdown({session, status}) {
    // console.log(session, status)
    return (
        <DropdownMenu onOpenChange={() => isAuthenticated(session, status)}>
            <DropdownMenuTrigger asChild >
                <button className="px-2 py-1 rounded-full ml-2 flex items-center hover:bg-[#F5F7FB] outline-none">
                {!!session && <BiUserCircle size={25} className='mr-1' />}
                    <span className="hidden lg:block">{!!session ? "My Account" : "Log in "}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#FCFAFF] shadow-none border-[#B4C1DB]" align="end">
                <DropdownMenuLabel>{!!session ? "My Account" : "Log in "}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {
                        menuItems.map((item, index) => (
                            <Link href={item.link} key={index}>
                                <DropdownMenuItem className='hover:cursor-pointer'>
                                    {item.name}
                                </DropdownMenuItem>
                            </Link>
                        ))
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem  onClick={() => {
                        console.log("checkout")
                        signOut()}} >
                    Sign Out <MdLogout size={20} className='ml-2' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

