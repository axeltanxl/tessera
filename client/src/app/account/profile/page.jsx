'use client'
import React from 'react'
import SideNav from '@/components/ui/accountNav/SideNav'

const MyProfile = () => {
  return (
    <div className='flex '>
            <div className='mr-10'>
                <SideNav activeTab={3}/>
            </div>
            <div>
                <div>My Profile</div>
            </div>
        </div>
  )
}

export default MyProfile