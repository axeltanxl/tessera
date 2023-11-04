'use client'
import Modal from '@mui/material/Modal';
import { useState } from "react";
import axios from "axios";

export default function DeleteModal({ item, openDeleteModal, handleCloseDeleteModal, handleDeleteListing }) {
    //delete listing
    const token = localStorage.getItem('jwt');
    const listingID = item?.ticketList?.listingID;
    const deleteTicketListing = async (listingID) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/ticketListings/${item?.ticketList?.listingID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to delete data');
            }
        } catch (e) {
            console.error(e);
        }
    }
    const handleDeleteTicketListing = (listingID) => {
        deleteTicketListing(listingID);
        handleDeleteListing();
        handleCloseDeleteModal();
    }

    return (
        <Modal open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className='absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-white rounded-sm pb-6'>
                <div className="flex flex-col flex-1 p-6">
                    Are you sure you want to delete this ticket listing?
                </div>
                <div className='flex justify-center mt-1'>
                    <button className='border border-amber-300 rounded-sm px-4 py-1 mr-4 text-sm' onClick={handleCloseDeleteModal}>Cancel</button>
                    <button className='bg-amber-300 rounded-sm px-4 py-1 ml-4 text-sm' onClick={handleDeleteTicketListing}>Delete </button>
                </div>
            </div>
        </Modal>
    )
}