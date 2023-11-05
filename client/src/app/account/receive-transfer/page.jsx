'use client'
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'

const ReceiveTransfer = () => {
  return (
    <section className='flex mt-10'>
      <div className='mr-20 ml-10'>
        <SideNav activeTab={2} />
      </div>

      <div>
        <p className='text-xl mb-4 font-semibold flex-1'>Receive Transfer</p>
        <p className='font text-sm text-[#1F6EB7]'>Simply enter your transfer code below to receive tickets directly.</p>
        <p className='font text-sm text-[#1F6EB7]'> It&#39;s always a good idea that you know and trust the person transferring tickets to you.</p>
        <p className='font text-sm text-[#1F6EB7]'>After a successful transfer, you will find your tickets in &#39;My Tickets&#39;.</p>
        <p className='font text-sm text-[#1F6EB7]'>You will also be able to view a record the direct transfer in &#39;Transaction History&#39;</p>
        <div className='my-8'>
          <p>Please enter your unique transfer code:</p>
          <div className='flex my-4'>
            <div className='mr-4'>Transfer Code:</div>
            <div className=''>
              <input type="text" className='border border-[#B4C1DB] rounded-sm px-2'>
              </input>
              <div className='flex items-center'>
              <button className='bg-amber-300 rounded-sm px-4 py-1 my-4 text-sm'>Submit</button>
              <p className='font text-sm text-[#1A8E3A] mx-2'>Ticket received! Go to ‘My Tickets’ to find it</p>
              </div>
            
            </div>
          </div>
        </div>
      </div>

    </section>

  )
}

export default ReceiveTransfer