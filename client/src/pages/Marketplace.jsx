import { MarketplaceCard } from "@/components/ui/MarketplaceCard";
import Head from 'next/head';
import { RadioDropdown } from "@/components/ui/RadioDropdown";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
const Marketplace = () => {
    const marketplaceListings = [
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },    
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },  
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },  
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },  
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },   
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },    
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },  
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },  
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },  
        {
            id: 5,
            title: 'Taylor Swift The Eras Tour',
            description: "Matilda The Musical is the multi-award winning musical from the Royal Shakespeare Company, inspired by the beloved book by the incomparable Roald Dah. With book by Dennis Kelly and original songs by Tim Minchin, Matilda The Musical is the story of an extraordinary little girl who, armed with a vivid imagination and a sharp mind, dares to take a stand and change her own destiny.Winner of 101 international awards, including 24 for Best Musical, Matilda The Musical has been delighting audiences in London’s West End and across the world for over a decade.",
            category: 'Concert',
            startDate: '8 March 2024',
            src: '/image-9.jpg',
            item:'4 x CAT 1 Standing Tickets',
            price: '400'
        },   
    ]
    const categoryDropdownOptions = ["Concerts", "Festivals", "Musicals", "Sports", "Theatre"]
    return (
        <section className="bg-primary">
            <Head>
                <title>Tessera - Marketplace</title>
            </Head>
            <div className="flex flex-col mx-2 md:mx-20 p-10 md:p-4">
                <p className="text-xl mb-4 mt-10 font-semibold">Marketplace</p>
                <div className='mb-2 flex flex-row'>
                    <div className='mr-4'>
                        <RadioDropdown name={"Category"} dropdownItems={categoryDropdownOptions} />
                    </div>
                    <DateRangePicker/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        marketplaceListings.map((item, index) => {
                            return (
                                <MarketplaceCard details={item} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </section>)
}

export default Marketplace;

