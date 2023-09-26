'use client';
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import usePaymentFormContext from "../hooks/usePaymentFormContext";

const infoName = "Neo Shyh Ruey";
const infoEmail = "srneo.2022@scis.smu.edu.sg";
const infoHp = "+65 93394099";

const paymentSpecifics = [
    { type: "Credit Card / Debit Card", desc: "Credit Cards (Visa / MasterCard / American Express), Atome, GrabPay are accepted", },
    // { type: "Apple Pay", desc: "Compatible with Apple Devices on the web in Safari", },
    // { type: "UnionPay", desc: "UnionPay", },
    // { type: "WeChat Pay", desc: "Applicable for Mainland China Accounts only", },
    // { type: "Alipay", desc: "Applicable for Mainland China Accounts only", },
];

const hardCodedValues = {
    "jwt" : localStorage.getItem("jwt"),
    "eventID" : 1,
    "quantity" : 3, 
    "category" : "catB", 
    "images" : "https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/09/s3-2.png",
    "paymentMethod" : "card",
};


const Confirmation = () => {

    const {title, page, setPage, selectedZone, setSelectedZone, selectedCat, setSelectedCat, selectedPrice, setSelectedPrice, selectedQuant, setSelectedQuant} = usePaymentFormContext();
    const handlePrev = () => setPage(prev => prev - 1)

    const handleConfirmation = async (data) => {
        const res = await axios.post('/api/checkout', data, 
        {
            headers : {
                "Content-Type" : "application/json",
            },
        });
        console.log("order res",res.data)
        localStorage.setItem("orderId", res.data.orderId);
        localStorage.setItem("paymentMethod", res.data.paymentMethod);
        const {webUrl} = res.data
        window.location.assign(webUrl);
        // very insecure pls change later change to webhook please
    }


    const [paymentChoices, setPaymentChoices] = useState([
        "Credit Card / Debit Card",
        // "Apple Pay",
        // "UnionPay",
        // "WeChat Pay",
        // "Alipay",
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


    const getTicketsCheckout = [
        {   
            ticketID: 1,
            eventName: "Taylor Swift The Eras Tour",
            startDate: "8 March 2024 6-9pm",
            venue: "National Stadium",
            row: 1,
            seatNo: 22,
            category:"A",
            section: "PA1",
            price: 300
        },
        {
            ticketID: 2,
            eventName: "Taylor Swift The Eras Tour",
            startDate: "8 March 2024 6-9pm",
            venue: "National Stadium",
            row: 1,
            seatNo: 23,
            category: "A",
            section: "PA1",
            price: 300
        },
        {
            ticketID: 3,
            eventName: "Taylor Swift The Eras Tour",
            startDate: "8 March 2024 6-9pm",
            venue: "National Stadium",
            row: 1,
            seatNo: 24,
            category: "A",
            section: "PA1",
            price: 300
        },
        {
            ticketID: 4,
            eventName: "Taylor Swift The Eras Tour",
            startDate: "8 March 2024 6-9pm",
            venue: "National Stadium",
            row: 1,
            seatNo: 25,
            category: "A",
            section: "PA1",
            price: 300
        }
    ]
    
    const [rerender, setRerender] = useState(true);
    const [checkoutTickets, setCheckoutTickets] = useState(getTicketsCheckout);
    const handleRemoveCheckoutTicket = (ticketID) => {
        console.log("to remove:", ticketID)
        const newList = checkoutTickets.filter((item) => item.ticketID != ticketID);
        console.log("new list:", newList);
        setCheckoutTickets(newList);
        setRerender(true);
    }
    useEffect(() => {
        //api call

    }, [rerender]);

    
    return (
        
        <div>
            <div style={{
                width: "80%", marginLeft: "10%", marginRight: "10%", textAlign: "center", marginTop: "1rem",
                padding: "1rem", backgroundColor: "#fbe7e6", border: "1px solid #c2292e", borderRadius: "5px", color: "#c2292e", fontSize: "14px"
            }}>
                Please fill out details below and submit your order within 00:00
            </div>

            <div style={{ fontSize: "12px" }}>
                <div style={{ marginLeft: "10%", marginTop: "2rem" }}>Contact Details</div>
                <div style={{
                    width: "80%", marginLeft: "10%", marginRight: "10%", marginTop: "",
                    padding: "1rem", backgroundColor: "#f3f3f3", border: "1px solid #bfbfbf", borderRadius: "5px"
                }}>
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

            <div style={{ fontSize: "12px" }}>
                <div style={{ marginLeft: "10%", marginTop: "2rem" }}>Payment Methods</div>
                <div style={{
                    width: "80%", marginLeft: "10%", marginRight: "10%",
                    padding: "1rem", backgroundColor: "#f3f3f3", border: "1px solid #bfbfbf", borderRadius: "5px"
                }}>
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
                                            style={{ fontWeight: "bold" }}>
                                            {choice}
                                        </div>
                                        <div
                                            style={{ paddingBottom: "1rem" }}>
                                            {getDescriptionForPayment(choice)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ fontSize: "12px" }}>
                <div style={{ marginLeft: "10%", marginTop: "2rem" }}>Delivery Methods</div>
                <div style={{
                    width: "80%", marginLeft: "10%", marginRight: "10%",
                    padding: "1rem", backgroundColor: "#f3f3f3", border: "1px solid #bfbfbf", borderRadius: "5px"
                }}>
                    <div>
                        <select
                            value={selectedDeliveryMethod}
                            onChange={handleDeliveryMethodChange}
                            style={{ width: "100%", padding: "0.5rem", backgroundColor: "#f3f3f3" }}// Disable the select if no payment method is selected
                        >
                            <option value="op">Select a delivery method</option>
                            {deliveryMethods.map((method, index) => (
                                <option key={index} value={method}>
                                    {method}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "1rem", width: "80%", marginLeft: "10%", marginTop: "5%" }}>
                <div style={{ fontSize: "12px" }}>Order Details</div>
                <div className="table2" style={{
                    textAlign: "center", alignContent: "center", alignItems: "center",
                    border: "1px solid #464873", marginTop: "1rem", width: "100%", padding: "3%", marginBottom: "1rem"
                }}>
                    <div className="table-row2 table-header2">
                        <div className="table-cell2">Item</div>
                        <div className="table-cell2">Ticket Info</div>
                        <div className="table-cell2">Details</div>
                        <div className="table-cell2">Price</div>
                        <div className="table-cell2">Action</div>
                    </div>
                    {getTicketsCheckout.map((item, index) => (
                        <div className="table-row2" key={index}>
                            <div className="table-cell2">
                                <div style={{ textAlign: "center", fontWeight: "bold" }}>{item.eventName}</div>
                                <div style={{ textAlign: "center" }}>{item.startDate}, {item.venue}</div>
                            </div>
                            <div className="table-cell2">
                                Row {item.row}, Seat {item.seatNo}
                            </div>
                            <div className="table-cell2">
                                Category {item.category}, Zone {item.section}
                            </div>
                            <div className="table-cell2">${item.price}</div>
                            <div className="table-cell2">
                                <button onClick={() => handleRemoveCheckoutTicket(item.ticketID)} className="bg-[#fbe7e6] p-1 border rounded border-[#c2292e] text-[#c2292e]">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div onClick={handlePrev} style={{ margin: "2rem", textAlign: "center", fontSize: "12px" }}>
                <button className="p-1" style={{ marginRight: "5%", width: "10%", border: "1px solid #ccc", borderRadius: "5px" }}>
                    Cancel Order
                </button>

                <button className="p-1 font-semibold" style={{ width: "10%", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#7eda94" }}
                onClick={() => handleConfirmation(hardCodedValues)}>
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