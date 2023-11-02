'use client';
import { EventCard } from "@/components/ui/EventCard";
import Carousel from "@/components/ui/carousel"
import { jwtHasExpired } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from 'react';
import { signOut } from "next-auth/react";

export const getEvents = async () => {
    const res = await fetch("http://localhost:8080/api/v1/events");
    console.log(res);
    const events = await res.json()

    return events
}
function Home() {

    // const { data: session, status } = useSession();
    // console.log("home session:", session);
    // if (status === "unauthenticated" || !session || !session.user) {
    //     redirect("/");
    // }
   
    const [events, setEvents] = useState([]);
    console.log("events:", events);

    const jwt = localStorage.getItem("jwt");
    if(!jwt || jwtHasExpired(jwt)){
        signOut();
    }
    useEffect(() => {
        // if (status === "authenticated" && session && session.user) {
            async function fetchData() {
                try {
                    const res = await fetch("http://localhost:8080/api/v1/events", {
                        method: 'GET',
                    });
                    if (res.status === 200) {
                        const eventsData = await res.json()
                        setEvents(eventsData);
                    } else {
                        console.error("API request failed.");
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                }
            }
            fetchData();
        // }
    }, []);

    return (
        <div className="z-0">
            <Carousel />
            <div className="flex flex-col md:mx-20 mt-10">
                <p className="text-xl mb-4 font-semibold">Trending Now</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        events.map((item, index) => {
                            return (
                                <EventCard details={item} key={item.eventID} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col md:mx-20 mt-10">
                <p className="text-xl mb-4 font-semibold">Selling fast on Marketplace</p>
                <p className="text-[#1F6EB7] cursor-pointer">See more on Marketplace</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        events.map((item, index) => {
                            return (
                                <EventCard details={item} key={item.eventID} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;
Home.requireAuth = true;
