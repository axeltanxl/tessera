"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";


const DisplayProduct = ({price}) => {

    const handleBuy = async (e) => {
        e.preventDefault();
        // console.log("clicked")
        const { data } = await axios.post('/api/payment', 
        {
            priceId : price.id
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
        <p>name : {price.nickname}</p>

        price : {(price.unit_amount / 100).toLocaleString('en-US', {
            style : 'currency',
            currency : 'SGD'
        })}

    <Button variant="outlined" 
        className="border-black border-2"
        onClick={handleBuy}
        >buy</Button>
    </div>
    )
}

export default DisplayProduct;