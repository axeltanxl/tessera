import QRCode from 'qrcode'
import axios from 'axios';
import { cookies } from "next/headers"
import { NextResponse } from 'next/server';


export const getQRurl = async (ticketID) => {
    const res = await fetch(`${process.env.NEXT_BACKEND}/ticketing/${ticketID}`, {method: 'GET'}, { next: { revalidate: 5 } });
    // const res = await fetch(`http://localhost:3000/api/ticketing/${ticketID}`, {method: 'GET'}, { next: { revalidate: 5 } });
    const {qrString} = await res.json();
    // console.log("qrString:", qrString);
    const url = await QRCode.toDataURL(qrString)
    // console.log("URLEE:", url)
    return url;
}

// export const decryptQRUrl = async () => {
//     const QRUrl = "U2FsdGVkX18Nov26LhpWfHDd3PDxWgxxrBuVcfqQwR9LJgd6xzZ3XoPuS2n2WtwUUXC1E39xZMBKhVac0yWN7Z5C2gyT15dMmf9V42AbvQWO8LDbYrCDUd+YpfFujHWRKj9CcaOuIlPFYXVOONhDINfYF9sEyl26NY1/lBpr4B8vxXYsfhk46hGxxR/FL7pE+vkuMBS6Y8PZxQ9BcH1WpQ==";
    
//     const res = await fetch(`${process.env.NEXT_BACKEND}/ticketing`,{
//         method: 'POST',
//         headers : {
//             'Content-Type': 'application/json'
//         },
//         body : {QRUrl},
//     }, { next: { revalidate: 5 } }, 
//     );

//     //  console.log(res.json());
// }


export const getTicketDetails = async(ticketID) => {
    const token = cookies().get("jwt_spring").value;
    console.log(token)

    // const response = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/tickets/${ticketID}/events/runs/seats`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    try{
        const res = await fetch(`${process.env.SPRING_BACKEND}/tickets/${ticketID}/events/runs/seats`, {
            method: 'GET',
            headers : {"Authorization": `Bearer ${token}`,}
        });    
        const details = await res.json();
        console.log(details);
        const { seat, event, venue, run} = details
        console.log(seat)
        const {row, section, seatNo, category} = seat
        console.log(event)
        const { displayImage, name : eventName } = event;
        console.log(venue)
        const { name : venueName } = venue;
        console.log(run);
        const { date } = run

        const output = {
            seatNo : seatNo,
            row : row,
            section : section,
            category : category,
            eventName : eventName,
            displayImage : displayImage,
            venueName : venueName,
            date : date,
        }
        
        return output;

    }catch {
        return null;
    }
}