import QRCode from 'qrcode'
import axios from 'axios';

export const getQRurl = async (ticketID) => {
    const res = await fetch(`${process.env.NEXT_BACKEND}/ticketing/${ticketID}`, {method: 'GET'}, { next: { revalidate: 5 } });
    const {qrString} = await res.json();
    console.log(qrString);
    const url = await QRCode.toDataURL(qrString)
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