'use client'
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'

const TransferHistory = () => {
    return (
        <div className='flex '>
            <div className='mr-10'>
                <SideNav activeTab={1}/>
            </div>
            <div>
                <div>Transfer History</div>
            </div>
        </div>
    )
}

export default TransferHistory;