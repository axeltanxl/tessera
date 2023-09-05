"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import DisplayProduct from "@/components/pages/products/DisplayProduct";



const Products = () => {
    const [ prices, setPrices] = useState();
    
    const fetchPrices = async () => {
        const { data } = await axios.get('/api/getProducts');
        setPrices(data);
        console.log(data);
    }

    useEffect(()=> {
        fetchPrices();
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">products page temp</p>

            {prices && prices.map((price) => {
                console.log(price.metadata)
                return (
                   <DisplayProduct price={price} key={price.id}/>
                )
            })}
           
        </div>
    )
}
export default Products;