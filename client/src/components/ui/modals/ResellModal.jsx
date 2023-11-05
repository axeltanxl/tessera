'use client'
import { CalendarIcon } from "@radix-ui/react-icons";
import { IoLocationOutline } from 'react-icons/io5';
import { formatDate, formatTime } from '@/lib/formatUtil';
import Modal from '@mui/material/Modal';
import TicketCard from "../cards/TicketCard";
import { useState } from "react";
import axios from "axios";


export default function ResellModal({item, open, handleClose, handleUpdateInPrice}) {
    const [resalePrice, setResalePrice] = useState(''); // Initialize with an empty string

    const handleResalePriceChange = (e) => {
        setResalePrice(e.target.value); // Update the state with the new value
    };

    const handleResell = () => {
        updateResalePrice(resalePrice)
        handleUpdateInPrice();
        handleClose();
    }
    const listingID = item?.ticketList?.listingID;
    const token = localStorage.getItem('jwt');

    const updateResalePrice = async (resalePrice) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/ticketListings/${listingID}`,
                {
                    price: resalePrice
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (response.status === 200) {
                return response.data;

            } else {
                throw new Error('Failed to update ticket listing');
            }

        } catch (err) {
            console.error(err);
        }
    }
    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div className='absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-white rounded-sm pb-6'>
            <div className="flex flex-col flex-1 p-6">
                <div className='flex'>
                    <div className='flex justify-center flex-col pr-4'>
                        <p className='font-bold'>{item?.event?.name}</p>
                        <p className='flex items-center'><CalendarIcon />{formatDate(item?.run?.date)} {formatTime(item?.run?.startTime)} - {formatTime(item?.run?.endTime)}</p>
                        <p className='flex items-center'><IoLocationOutline />{item?.venue?.name}</p>
                    </div>
                    <div className=''>
                        <TicketCard category={item?.seat?.category} section={item?.seat?.section} row={item?.seat?.row} seatNo={item?.seat?.seatNo} />
                    </div>
                </div>
                {/* <p className='mt-1 font-bold'>Original price: $200</p> */}
                <div className='flex mt-4'>
                    <p className='font-bold'>Input resale price:</p>
                    <p className='ml-4'>$</p>
                    <input type="price" placeholder='e.g. 200' className='border border-[#B4C1DB] rounded-sm px-2' value={resalePrice} onChange={handleResalePriceChange}>
                    </input>
                </div>

            </div>
            <div className='flex justify-center mt-1'>
                <button className='border border-amber-300 rounded-sm px-4 py-1 mr-4 text-sm' onClick={handleClose}>Cancel</button>
                <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm' onClick={handleResell}>Resell </button>
            </div>
        </div>
    </Modal>)
}