'use client'
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'

const TransferHistory = () => {
    return (
        <section className='flex mt-10'>
            <div className='mr-20 ml-10'>
                <SideNav activeTab={1} />
            </div>

            <div>Transfer History</div>

        </section>
    )
}

export default TransferHistory;