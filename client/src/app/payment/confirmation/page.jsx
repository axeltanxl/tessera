'use client';
import React from "react";
import { useState } from "react";

const infoName = "Neo Shyh Ruey";
const infoEmail = "srneo.2022@scis.smu.edu.sg";
const infoHp = "+65 93394099";

const paymentSpecifics = [
    {type:"Credit Card / Debit Card", desc:"Credit Cards (Visa / MasterCard / American Express), Atome, GrabPay are accepted",},
    {type:"Apple Pay", desc:"Compatible with Apple Devices on the web in Safari",},
    {type:"UnionPay", desc:"UnionPay",},
    {type:"WeChat Pay", desc:"Applicable for Mainland China Accounts only",},
    {type:"Alipay", desc:"Applicable for Mainland China Accounts only",},
];

const Confirmation = () => {
    const [paymentChoices, setPaymentChoices] = useState([
        "Credit Card / Debit Card",
        "Apple Pay",
        "UnionPay",
        "WeChat Pay",
        "Alipay",
    ]);

    const getDescriptionForPayment = (paymentType) => {
        const selectedPaymentInfo = paymentSpecifics.find(
          (payment) => payment.type === paymentType
        );
        return selectedPaymentInfo ? selectedPaymentInfo.desc : "";
    };

    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePaymentChoiceClick = (choice) => {
        setSelectedPayment(choice);
    };

    const [deliveryMethods, setDeliveryMethods] = useState([
        "Print-at-Home",
        "Home Delivery",
        "Venue Collection",
    ]);

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

    const handleDeliveryMethodChange = (event) => {
        setSelectedDeliveryMethod(event.target.value);
    };

    return(
        <div>
            <div style={{ width:"80%", marginLeft:"10%", marginRight:"10%", textAlign:"center", marginTop:"1rem",
            padding:"1rem", backgroundColor:"#fbe7e6", border:"1px solid #c2292e", borderRadius:"5px", color:"#c2292e", fontSize:"14px"}}>
                Please fill out details below and submit your order within 00:00
            </div>

            <div style={{fontSize:"12px"}}>
                <div style={{marginLeft:"10%", marginTop:"2rem"}}>Contact Details</div>
                <div style={{ width:"80%", marginLeft:"10%", marginRight:"10%", marginTop:"",
                padding:"1rem", backgroundColor:"#f3f3f3", border:"1px solid #bfbfbf", borderRadius:"5px"}}>
                    <div className="table">
                        <div className="table-row">
                            <div className="table-cell">Full Name</div>
                            <div className="table-cell">{infoName}</div>
                            <div className="table-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div className="table-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">Email</div>
                            <div className="table-cell">{infoEmail}</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">Contact Number</div>
                            <div className="table-cell">{infoHp}</div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div style={{fontSize:"12px"}}>
                <div style={{marginLeft:"10%", marginTop:"2rem"}}>Payment Methods</div>
                <div style={{ width:"80%", marginLeft:"10%", marginRight:"10%",
                padding:"1rem", backgroundColor:"#f3f3f3", border:"1px solid #bfbfbf", borderRadius:"5px"}}>
                    <div>
                        <div >
                            {paymentChoices.map((choice, index) => (
                            <div
                                key={index}
                                onClick={() => handlePaymentChoiceClick(choice)}
                                className="flex" padding="1rem"
                            >
                                <div className={`bubble ${selectedPayment === choice ? 'selected-bubble' : ''}`}></div>
                                <div>
                                    <div
                                        style={{fontWeight:"bold"}}>
                                        {choice}
                                    </div>
                                    <div
                                        style={{paddingBottom:"1rem"}}>
                                            {getDescriptionForPayment(choice)}
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{fontSize:"12px"}}>
                <div style={{marginLeft:"10%", marginTop:"2rem"}}>Delivery Methods</div>
                <div style={{ width:"80%", marginLeft:"10%", marginRight:"10%",
                padding:"1rem", backgroundColor:"#f3f3f3", border:"1px solid #bfbfbf", borderRadius:"5px"}}>
                    <div>
                    <select
                        value={selectedDeliveryMethod}
                        onChange={handleDeliveryMethodChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#f3f3f3" }}
                        disabled={!selectedPayment} // Disable the select if no payment method is selected
                        >
                        <option value="">Select a delivery method</option>
                        {deliveryMethods.map((method, index) => (
                            <option key={index} value={method}>
                            {method}
                            </option>
                        ))}
                        </select>
                    </div>
            </div>
            </div>
            
            <div style ={{marginTop:"1rem", width:"80%", marginLeft:"10%", marginTop:"5%"}}>
            <div style={{fontSize:"12px"}}>Order Number: </div>
            <div className="table2" style={{textAlign:"center",alignContent:"center",alignItems:"center",
                border:"1px solid #464873", marginTop:"1rem", width:"100%", padding:"3%", marginBottom:"1rem"}}>
                <div className="table-row2 table-header2">
                    <div className="table-cell2">Item</div>
                    <div className="table-cell2">Ticket Info</div>
                    <div className="table-cell">Details</div>
                    <div className="table-cell">Price</div>
                </div>
                <div className="table-row2">
                    <div className="table-cell2">
                        <div style={{textAlign:"center", fontWeight:"bold"}}>Taylor Swift: The Eras Tour 2024</div>
                        <div style={{textAlign:"center"}}>8 March 2024 6-9pm, National Stadium Singapore</div>
                    </div>
                    <div className="table-cell2">
                            Row 1, Seat 1
                    </div>
                    <div className="table-cell2">
                            Category 1, Zone PA1
                    </div>
                    <div className="table-cell2">$348</div>
                </div>
                <div className="table-row2">
                    <div className="table-cell2">
                        <div style={{textAlign:"center", fontWeight:"bold"}}>Taylor Swift: The Eras Tour 2024</div>
                        <div style={{textAlign:"center"}}>8 March 2024 6-9pm, National Stadium Singapore</div>
                    </div>
                    <div className="table-cell2">
                            Row 1, Seat 2
                    </div>
                    <div className="table-cell2">
                            Category 1, Zone PA1
                    </div>
                    <div className="table-cell2">$348</div>
                </div>
                <div className="table-row2">
                    <div className="table-cell2">
                        <div style={{textAlign:"center", fontWeight:"bold"}}>Taylor Swift: The Eras Tour 2024</div>
                        <div style={{textAlign:"center"}}>8 March 2024 6-9pm, National Stadium Singapore</div>
                    </div>
                    <div className="table-cell2">
                            Row 1, Seat 3
                    </div>
                    <div className="table-cell2">
                            Category 1, Zone PA1
                    </div>
                    <div className="table-cell2">$348</div>
                </div>
                <div className="table-row2">
                    <div className="table-cell2">
                        <div style={{textAlign:"center", fontWeight:"bold"}}>Taylor Swift: The Eras Tour 2024</div>
                        <div style={{textAlign:"center"}}>8 March 2024 6-9pm, National Stadium Singapore</div>
                    </div>
                    <div className="table-cell2">
                            Row 1, Seat 4
                    </div>
                    <div className="table-cell2">
                            Category 1, Zone PA1
                    </div>
                    <div className="table-cell2">$348</div>
                </div>
            </div>
            </div>

            <div style={{margin:"2rem", textAlign:"center", fontSize:"12px"}}>
                <button style={{marginRight:"5%", width:"10%", border:"1px solid #ccc", borderRadius:"5px"}}>
                    Cancel Order
                </button>
                <button style={{width:"10%", border:"1px solid #ccc", borderRadius:"5px",backgroundColor:"#7eda94"}}>
                    Confirm
                </button>
            </div> 

            <style jsx>
                {`
                    .table {
                        display: table;
                        width: 100%;
                    }

                    .table-row {
                        display: table-row;
                    }
                    
                    .table-cell {
                        display: table-cell;
                        padding: 8px;
                    }

                    .bubble {
                        width: 16px;
                        height: 16px;
                        background-color: white;
                        border: 3px solid #ccc;
                        border-radius: 50%;
                        margin-right: 5%;
                        margin-top: 1%;
                    }

                    .selected-bubble {
                        /* Style for the selected bubble */
                        background-color: green;
                        border-color: #ccc;
                        display : flex;
                    }
                    
                    .table2 {
                        display: table;
                        font-size: 12px;
                        width: 100%;
                        border-collapse: collapse; /* To collapse the borders between cells */
                    }
                    
                    .table-row2 {
                        display: table-row;
                        border: 1px solid #ccc; /* Add a border to each row */
                    }
                    
                    .table-cell2 {
                        display: table-cell;
                        padding: 8px;
                        border: 1px solid #ccc; /* Add a border to each cell */
                    }
                    
                    .table-header2 {
                        font-weight: bold;
                        background-color: #f0f0f0;
                    }
                `}
            </style>

        </div>
    )
}


export default Confirmation;