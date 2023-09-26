'use client'
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'

const ReceiveTransfer = () => {
  return (
    <section className='flex mt-10'>
      <div className='mr-20 ml-10'>
        <SideNav activeTab={2} />
      </div>

      <div>Receive Transfer</div>

    </section>

  )
}

export default ReceiveTransfer