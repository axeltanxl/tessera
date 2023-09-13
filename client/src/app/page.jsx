'use client';
import { EventCard } from "@/components/ui/EventCard";
import Carousel from "@/components/ui/carousel"
export default function Home() {
    const slides = [
        "/image-1.png",
        "/image-2.png",
        "/image-3.png"
    ]

    const trendingPicks = [
        {
            id: 5,
            title: 'Mathilda The Musical',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Musical',
            startDate: '1 Sep 2023',
            endDate: '15 Sep 2023',
            src: '/image-5.jpg'
        },
        {
            id: 6,
            title: 'Mari Kita Main Wayang by...',
            description: "It’s hijinks and humour abound in Mari Kita Main Wayang (Let’s Stage A Play)!",
            category: 'Theatre',
            startDate: '1 Sep 2023',
            endDate: '15 Sep 2023',
            src: '/image-7.jpg'
        },
        {
            id: 5,
            title: 'Mathilda The Musical',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Musical',
            startDate: '1 Sep 2023',
            endDate: '15 Sep 2023',
            src: '/image-5.jpg'
        },
        {
            id: 6,
            title: 'Mari Kita Main Wayang by...',
            description: "It’s hijinks and humour abound in Mari Kita Main Wayang (Let’s Stage A Play)!",
            category: 'Theatre',
            startDate: '1 Sep 2023',
            endDate: '15 Sep 2023',
            src: '/image-7.jpg'
        },

    ]
    return (
        <div className="z-0">
            <Carousel/>
            <div className="flex flex-col md:mx-20 mt-10">
                <p className="text-xl mb-4 font-semibold">Trending Now</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        trendingPicks.map((item, index) => {
                            return (
                                <EventCard details={item} key={index} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col md:mx-20 mt-10">
                <p className="text-xl mb-4 font-semibold">Selling fast on Marketplace</p>
                <p className="text-[#1F6EB7] cursor-pointer">See more on Marketplace</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {
                        trendingPicks.map((item, index) => {
                            return (
                                <EventCard details={item} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
