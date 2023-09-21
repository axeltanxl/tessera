import React from "react";
import { Tick } from "./Tick";


const Receipt = () => {
    return (
        <div>
            <div style={{textAlign:"center"}}>
                {<Tick size={50} style={{ display: "inline-block" }} />}
                <span style={{ display: "inline-block" }}></span>
            </div>
            <div style={{margin:"2rem", textAlign:"center" }}>
                Your ticket bookings have been confirmed. You can now view your tickets under "My Tickets"
            </div>
            <div style={{margin:"1rem", textAlign:"center" }}>
                Thank you for using Tessera. 
            </div>
            <div style={{margin:"1rem", textAlign:"center" }}>
                <button style={{paddingLeft:"3%", paddingRight:"3%", border:"1px solid", margin:"1rem",
                                borderRadius:"10px"}}>
                    Return to Home
                </button>
            </div>
        </div>
    );
}

export default Receipt;