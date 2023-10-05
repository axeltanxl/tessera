"use client"

import QRCode from 'qrcode'
import { useEffect, useRef, useState } from 'react'

export const QRcode = ({qrString}) => {
    const [src, setSrc] = useState();
    useEffect(() => {
        QRCode.toDataURL(qrString).then(setSrc)
        setTimeout(() => {window.location.reload()}, 5000)
    }, [])

    return (
       <img src={src}/>
    )
}