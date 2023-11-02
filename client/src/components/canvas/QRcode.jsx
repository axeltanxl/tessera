"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export const QRcode =  ({qrUrl}) => {
    const TIMEOUT = 5000;
    const [key, setKey] = useState(new Date().toISOString());
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.refresh();
            setKey(new Date().toISOString())
        }, TIMEOUT)
    }, [qrUrl])
    
    return (
        <>
            <img src={qrUrl} alt='loading' className="w-[200px] h-[200px]"/>
                <CountdownCircleTimer
                key={key}
                isPlaying
                duration={TIMEOUT / 1000}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={30}
                strokeWidth={1}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </>
    )
}