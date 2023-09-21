"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IoTicketOutline } from "react-icons/io5";
import Image from "next/image";
import { useReward } from 'react-rewards';
import { useEffect } from "react";
import axios from "axios";

const SuccessPage = () => {
    const {reward: confettiRewardLeft } = useReward('confettiRewardLeft', 'confetti', {
        angle:70,
        elementCount : 100,
        startVelocity : 70,

    });
    const {reward: confettiRewardRight } = useReward('confettiRewardRight', 'confetti', {
        angle:110,
        elementCount : 100,
        startVelocity : 70,

    });
    
    useEffect(() => {
        axios.post("/api/checkout/success", {paymentMethod : "card", orderId : 1});

        confettiRewardLeft();
        confettiRewardRight();
    }, [])

    return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col justify-center items-center gap-4 drop-shadow-xl p-12">
            <div className="flex flex-col justify-center items-center gap-2">
                <Image width={200} height={200} src="/images/success.svg"/>
                <p className="text-4xl">Purchase Successful</p>
            </div>
            <div className="flex gap-4">
                <Button variant="outlined"  className="text-primary bg-secondary ">
                    View My Tickets
                </Button>

                <Button variant="outlined"  className="text-primary bg-secondary ">
                    View Purchase History
                </Button>
            </div>
        </div>

        <Thank/>
        <div className="w-full  flex justify-between">
            <div id="confettiRewardLeft">
                <Image width={100} height={100} src="/images/partyPopperL.svg"/>
            </div>
            <div id="confettiRewardRight">
                <Image width={100} height={100} src="/images/partyPopperR.svg"/>
            </div>
        </div>
    </div>)
}

export default SuccessPage;


const Thank = () => {
    return (
        <div className="flex bg-accent p-8">
            <div className="flex flex-col justify-center items-center">
                <p className="text-5xl">THANK YOU</p>
                <div className="flex items-center gap-2">
                    <p className="text-lg">for purchasing with Tessera</p>
                    <IoTicketOutline/>
                </div>
            </div>
        </div>
    )
}