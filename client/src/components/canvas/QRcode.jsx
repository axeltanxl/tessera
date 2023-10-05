"use client"

import QRCode from 'qrcode'
import { useRef, useState } from 'react'

export const QRcode = ({qrString}) => {
    const [src, setSrc] = useState();
    console.log("qrURL")
    console.log(qrString);
    QRCode.toDataURL(qrString).then(setSrc)
    return (
       <img src={src}/>
    )
}