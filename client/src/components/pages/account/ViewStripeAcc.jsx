"use client"
import axios from "axios";


const visitStripeAccount = async () => {
    const res2 = await axios.get("/api/stripeTransaction",{
        headers : {
            "Content-Type" : "application/json",
        },
    });
    if(res2.status === 200){
        const {stripeAccLoginUrl} = res2.data
        return stripeAccLoginUrl;
    }return null;
}
export const ViewStripeAcc = () => {
    return (<>
        <button className="w-1/6 rounded-lg text-primary bg-secondary hover:bg-secondary"
        onClick={async () => {
            const url = await visitStripeAccount();
            if(url){
                window.location.assign(url);
            }
        }}
        >
            View stripe account
        </button>
    </>)
} 