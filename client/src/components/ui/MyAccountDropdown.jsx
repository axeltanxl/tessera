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

export default function MyAccountDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="px-2 py-1 rounded-full ml-2 flex items-center">
                    <BiUserCircle size={25} className='mr-1'/>
                    <span className="hidden lg:block">My Account</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white shadow-none border-[#B4C1DB]" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        My Tickets
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Tranfer History
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Receive Transfer
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Sign Out <MdLogout size={20} className='ml-2' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

