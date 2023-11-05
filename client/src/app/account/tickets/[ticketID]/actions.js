import QRCode from 'qrcode'

export const getQRurl = async (ticketID) => {
    // const res = await fetch(`${process.env.NEXT_BACKEND}/ticketing/${ticketID}`, {method: 'GET'}, { next: { revalidate: 5 } });
    const res = await fetch(`${process.env.STRIPE_BACKEND}/ticketing/${ticketID}`, {method: 'GET'}, { next: { revalidate: 5 } });
    const {qrString} = await res.json();
    const url = await QRCode.toDataURL(qrString)
    return url;
}