'use client'
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'

const TransactionHistory = () => {
    return (
        <section className='flex mt-10'>
            <div className='mr-20 ml-10'>
                <SideNav activeTab={2} />
            </div>

            <div>Transaction History</div>

        </section>
    )
}

export default TransactionHistory;