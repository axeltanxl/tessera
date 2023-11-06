"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import DisplayProduct from "@/components/pages/products/DisplayProduct";

const Products = () => {
    const [ prices, setPrices] = useState();
    
    const fetchPrices = async () => {
        const { data } = await axios.get('/api/events');
        setPrices(data);
        console.log(data);
    }

    useEffect(()=> {
        fetchPrices();
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">products page temp</p>
            <p>if nothing here check if you have events in your db</p>
{/* sample data */}
{/* INSERT INTO event VALUES (3, '2023-08-19', 24, '2023-08-20', 1, 1, "concert", "description", '{"catA" : 100,"catB" : 110,"catC" : 120,"catD" : 130}'); */}
            {prices && prices.map((price) => {
                console.log(price.pricePerCategory)
                return (
                   <DisplayProduct price={price.pricePerCategory} key={price.eventID} eventID={price.eventID}/>
                )
            })}
        </div>
    )
}
export default Products;