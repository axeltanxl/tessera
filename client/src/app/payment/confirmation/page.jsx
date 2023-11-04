'use client';
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import usePaymentFormContext from "../hooks/usePaymentFormContext";
import { formatDate, formatTime } from "@/lib/formatUtil";  

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

// 

// https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/09/s3-2.png

const Confirmation = () => {

    const {title, page, setPage, selectedZone, setSelectedZone, selectedCat, setSelectedCat, selectedPrice, setSelectedPrice, selectedQuant, setSelectedQuant} = usePaymentFormContext();
    const handleNext = () => setPage(prev => prev + 1);

    const [user, setUser] = useState();
    const [runid, setRunid] = useState();
    const [event, setEvent] = useState();
    const [run, setRun] = useState();
    const [venue, setVenue] = useState();

    const[seats, setSeats] = useState();
    const [seatids, setSeatids] = useState();

    const token = localStorage.getItem('jwt');

    useEffect(() => {

        async function fetchTickets(){
            try {

                const search = window.location.href;
                const split = search.split("/");
                const temprunid = parseInt(split[split.length - 1]);
                const eventid = parseInt(split[split.length - 2]);

                console.log(temprunid);
                console.log(eventid);

                setRunid(temprunid);

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const userRes = await axios.get(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/users/accountDetails`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                
                if (userRes.status === 200) {
                    setUser(userRes.data);
                } else {
                   throw new Error('Failed to fetch data');
                }

                
                const eventRes = await fetch(`http://localhost:8080/api/v1/events/${eventid}`, {
                    method: 'GET',
                    headers,
                });
                const runRes = await fetch(`http://localhost:8080/api/v1/runs/${temprunid}`, {
                    method: 'GET',
                    headers,
                });
                const venueRes = await fetch(`http://localhost:8080/api/v1/events/${eventid}/venue`, {
                    method: 'GET',
                    headers,
                });
                if (eventRes.ok) {
                    const eventData = await eventRes.json();
                    setEvent(eventData);
                    console.log("1: ", eventData)
                } else {
                    console.error("API request failed.");
                }
                if (runRes.ok) {
                    const runData = await runRes.json();
                    setRun(runData);

                } else {
                    console.error("API request failed.");
                }
                if (venueRes.ok) {
                    const venueData = await venueRes.json();
                    setVenue(venueData);
                    console.log("2: ", venueData)
                } else {
                    console.error("API request failed.");
                }

                console.log("EVENT: " + event);
                console.log("RUN: " + run);

                const seatReqBody = {
                    category: selectedCat,
                    section: selectedZone,
                    quantity: selectedQuant,
                }
                const seatReqOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(seatReqBody),
                };
                const seatRes = await fetch(`http://localhost:8080/api/v1/runs/${temprunid}/seatAllocation`, seatReqOptions);

                if (seatRes.ok) {
                    const seatjson = await seatRes.json();
                    setSeats(seatjson);
                    console.log("seatjson: ", seatjson)
                    const items = [];
                    for (let i = 0; i < seatjson.length; i++){
                        items.push(seatjson[i].seatID)
                    }
                    setSeatids(items);

                } else {
                    console.error("API request failed.");
                }

            } catch (error) {
                console.error("An error occurred:", error);
            }
            
        }
        fetchTickets();
    },[]);


    const stripeValues = {
        "runID": runid,
        "jwt" : localStorage.getItem("jwt"),
        // "seatIDs": [],
        "quantity" : parseInt(selectedQuant, 10), 
        "category" : selectedCat,
        "paymentMethod" : "card",
        "seatIDs" : seatids,
    };
    
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
    
    const [rerender, setRerender] = useState(true);
    const [checkoutTickets, setCheckoutTickets] = useState(seats);
    //getTicketsCheckout
    
    const handleRemoveCheckoutTicket = (seatID) => {
        console.log("to remove:", seatID)
        const newList = checkoutTickets.filter((item) => item.seatID != seatID);
        console.log("new list:", newList);
        setCheckoutTickets(newList);
        setRerender(true);
    }
    useEffect(() => {
        //api call

    }, [rerender]);

    console.log("RET: SECTION: " + selectedZone);
    console.log("RET: QUANTITY: " + selectedQuant + " CAT: " + selectedCat + " RUNID: " + runid);
    console.log("SEAT: " + seats);
    console.log("seatids: ", seatids);

  
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
                            <div className="table-cell">{user?user.name:""} </div>
                            <div className="table-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div className="table-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">Email</div>
                            <div className="table-cell">{user?user.email:""}</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">Contact Number</div>
                            <div className="table-cell">{user?user.contactNum :""}</div>
                        </div>

                    </div>
                </div>
            </div>

            {seats?

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
                    {seats.map((item, index) => (
                        <div className="table-row2" key={index}>
                            <div className="table-cell2">
                                <div style={{ textAlign: "center", fontWeight: "bold" }}>{event? event.name : ""}</div>
                                <div style={{ textAlign: "center" }}>{run?formatDate(run.date):""}, {run?formatTime(run.startTime):""} - {run?formatTime(run.endTime):""}, {venue? venue.name:""}</div>
                            </div>
                            <div className="table-cell2">
                                Row {item.row}, Seat {item.seatNo}
                            </div>
                            <div className="table-cell2">
                                Category {selectedCat}, Section {selectedZone}
                            </div>
                            <div className="table-cell2">${selectedPrice/100}</div>
                            <div className="table-cell2">
                                <button onClick={() => handleRemoveCheckoutTicket(item.seatID)} className="bg-[#fbe7e6] p-1 border rounded border-[#c2292e] text-[#c2292e]">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            :
            <div style={{textAlign:"center", fontSize:"12px", paddingTop:"3rem"}}>
                No seats of selected quantity and section available
            </div>
            }

            <div onClick={handlePrev} style={{ margin: "2rem", textAlign: "center", fontSize: "12px" }}>
                <button className="p-1" style={{ marginRight: "5%", width: "10%", border: "1px solid #ccc", borderRadius: "5px" }}>
                    Cancel Order
                </button>

                <button className="p-1 font-semibold" style={{ width: "10%", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#7eda94" }}
                onClick={() => {handleConfirmation(stripeValues);handleNext();}}>
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
                    
                    .fresh {

                    }
                `}
            </style>

        </div>
    )
}


export default Confirmation;