'use client'
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'

const ReceiveTransfer = () => {
  return (
    <div className='flex '>
            <div className='mr-10'>
                <SideNav activeTab={2}/>
            </div>
            <div>
                <div>Receive Transfer</div>
            </div>
        </div>
  )
}

export default ReceiveTransfer