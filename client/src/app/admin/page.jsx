'use client'
import React from 'react'
import Head from 'next/head';
import { Separator } from "@/components/ui/separator"
import EventForm from '@/components/pages/admin/EventForm';


const Admin = () => {


    return (
        <section className="bg-primary h-full">
            <Head>
                <title>Tessera - Admin</title>
            </Head>
            <div className="z-0">
                <div className="flex flex-col xl:mx-20 mt-10">
                    <p className="text-xl mb-4 font-semibold">Promote your event on Tessera!</p>
                    <div className='mb-2'>
                        <p>Create Event</p>
                        <Separator />
                        <div className='w-2/5'>
                            <EventForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Admin;