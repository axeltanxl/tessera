"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export const QRcode =  ({qrUrl}) => {
    const TIMEOUT = 5000;
    const [key, setKey] = useState(0);
    const router = useRouter()
    useEffect(() => {
        router.refresh();
        // setTimeout(() => {
        //     setKey(new Date().toISOString())
        // }, TIMEOUT)
    }, [key])
    
    return (
        <>
            <img src={qrUrl} alt='loading' className="w-[200px] h-[200px]"/>
                {/* <CountdownCircleTimer
                key={key}
                isPlaying
                duration={TIMEOUT / 1000}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={30}
                strokeWidth={1}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer> */}
            <CountdownCircleTimer
                key={key}
                isPlaying
                strokeWidth={1}
                size={30}
                duration={10}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                onComplete={() => {
                    setKey(prevKey => prevKey + 1);
                    return [true, 1000];
                    }}
                >
                {renderTime}
                </CountdownCircleTimer>
        </>
    )
}

const renderTime = ({ remainingTime }) => {
 
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };
  