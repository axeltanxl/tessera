'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
const Carousel = () => {
    const slides = [
        '/image-1.png',
        '/image-2.png',
        '/image-3.png',
        '/image-4.png',
    ]

    const [curr, setCurr] = useState(0);
    const prev = () => setCurr(curr => curr === 0 ? slides.length - 1 : curr - 1)
    const next = () => setCurr(curr => curr === slides.length - 1 ? 0 : curr + 1)

    const autoSlideInterval = 4000;
    useEffect(() => {
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    },[])

    return (
        <div className='hidden md:flex justify-center items-center rounded'>
            <div className='overflow-hidden relative rounded xl:w-[45%]'>
                <div className='flex transition-transform ease-out duration-900' style={{ transform: `translateX(-${curr * 100}%)` }}>
                    {slides.map((s, index) => {
                        return (
                            <img src={s} key={index} alt="image" className='object-contain' />
                        )
                    })}
                </div>
                <div className='absolute inset-0 flex items-center justify-between p-4'>
                    <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                        <BiLeftArrow size={25} />
                    </button>
                    <button onClick={next} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                        <BiRightArrow size={25} />
                    </button>
                </div>
                <div className='absolute bottom-4 right-0 left-0'>
                    <div className='flex items-center justify-center gap-2'>
                        {slides.map((_, i) => {
                            return (
                                <div key={i} onClick={() => setCurr(i)} className={`transition-all w-3 h-3 bg-black rounded-full
                        ${curr === i ? 'p-1' : 'bg-opacity-50'}`}></div>)
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Carousel;