import CryptoJS from 'crypto-js'
import { QRcode } from "@/components/canvas/QRcode"

const hardCodedJson = {
    orderId : 1,
    eventID : 2,
    userID : 3,
    runID : 4,
    seatID : 5,
}
const ticketUniqueCode = CryptoJS.AES.encrypt(JSON.stringify(hardCodedJson), process.env.QR_SECRET_KEY1).toString();

const QRExample = () => {
    const dtg = new Date().toISOString();
    const data = {
        dtg : dtg,
        ticketUniqueCode : ticketUniqueCode,
    }
    const qrString = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.QR_SECRET_KEY2).toString();
    const decrypted1 = JSON.parse(CryptoJS.AES.decrypt(qrString, process.env.QR_SECRET_KEY2).toString(CryptoJS.enc.Utf8));
    // console.log("decrypted",decrypted1);
    const decrypted2 = JSON.parse(CryptoJS.AES.decrypt(decrypted1.ticketUniqueCode, process.env.QR_SECRET_KEY1).toString(CryptoJS.enc.Utf8));

    return (<>
        <div>hello</div>
        <div>encrypted : {qrString}</div>
        <div>decryptedDTG : {decrypted1.dtg}</div>
        <div>decrypted : {Object.keys(decrypted2).map((key) => {
            return (<div>key: {key}, value : {decrypted2[key]}</div>)
        })}
        </div>

        <div className='w-[500px] h-[500px]'>
            <QRcode qrString={qrString}/>
        </div>

    </>);
} 

export default QRExample;


