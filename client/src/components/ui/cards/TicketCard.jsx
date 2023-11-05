import React from 'react'

const TicketCard = ({category,section,row, seatNo}) => {
  return (
    <div className='bg-white w-48 border border-[#B4C1DB] my-2 p-4 rounded hover:cursor-pointer'>
        <p>Category {category} Ticket</p>
        <p>Zone {section}</p>
        <p>Row {row}, Seat {seatNo}</p>  
    </div>
  )
}

export default TicketCard