"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";

const DisplayProduct = ({price, eventID}) => {
    const pricePerCat = JSON.parse(price);
    const handleBuy = async (e, qty, cat) => {
        e.preventDefault();
        const { data } = await axios.post('/api/checkout', 
        {
            "eventID" : 1,
            "category" : cat,
            "quantity" : qty,
            "images" : "https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/09/s3-2.png"
        },
        {
            headers : {
                "Content-Type" : "application/json",
            },
        });

        // this is to display the payment page returned from the post request after clicking checkout
        window.location.assign(data);
    }



    return (
        <div className="border-red-500 border-2">
        <p>eventID : {eventID}</p>

        {
            Object.keys(pricePerCat).map((cat) => {
                const unitAmount = (pricePerCat[cat] / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
                const qty = 2;
                return (<div key={cat}>
                    <p>cat: {cat}</p>
                    <p>qty: {qty}</p>
                    <p>price: {unitAmount}</p>
                    <Button variant="outlined" 
                    className="border-black border-2"
                    onClick={(e) => handleBuy(e, qty, cat)}
                    >buy</Button>
                </div>)
            })
        }

    
    </div>
    )
}

export default DisplayProduct;