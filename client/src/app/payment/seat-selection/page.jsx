'use client'
import SeatingPlan from "@/components/ui/SeatingPlan";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import usePaymentFormContext from "../hooks/usePaymentFormContext";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const TicketPurchase = () => {
    const url = usePathname();
    console.log("url:", url);
    const parts = url.split("/");
    const eventID = parseInt(parts[3]);
    const runID = parseInt(parts[4]);
    console.log("runID:", runID);
    const token = localStorage.getItem('jwt');
    const [runMap, setRunMap] = useState([]);
    const [event, setEvent] = useState(null);
    useEffect(() => { 
        async function fetchRuns() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`http://localhost:8080/api/v1/events/${eventID}/runs`, {
                    method: 'GET',
                    headers,
                });
                if (res.ok) {
                    const result = await res.json();
                    setRunMap(result);
                } else {
                    console.error("API request failed.");
                }
            } catch (e) {
                console.error(e);
            }
        };
        async function fetchEvent(){
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`http://localhost:8080/api/v1/events/${eventID}`, {
                    method: 'GET',
                    headers,
                });
                if (res.ok) {
                    const result = await res.json();
                    setEvent(result);
                } else {
                    console.error("API request failed.");
                }
            } catch (e) {
                console.error(e);
            }
        }
        fetchRuns();
        fetchEvent();
    }, []);
    console.log("event:", event)
    const run = runMap.find(item => item.runID === runID);
    const date = run?.date ?? null;
    const startTime = run?.startTime ?? null;
    const endTime = run?.endTime ?? null;


    const { title, page, setPage, selectedZone, setSelectedZone, selectedCat, setSelectedCat, selectedPrice, setSelectedPrice, selectedQuant, setSelectedQuant } = usePaymentFormContext();

    const total = { selectedQuant } * { selectedPrice };

    const handleNext = () => setPage(prev => prev + 1)

    console.log({ selectedCat }, { selectedPrice }, { selectedQuant }, { selectedZone })
    return (
        <div>
            <div style={{ fontWeight: "bold", textAlign: "center" }}>{event?.name ?? null}</div>
            <div style={{ textAlign: "center", border: "1px solid grey", borderRadius: "10px", padding: "1%", marginTop: "2rem", marginBottom: "2rem", width: "80%", marginLeft: "10%" }}>{date} {startTime}-{endTime}pm, National Stadium Singapore</div>
            <Accordion type="multiple" style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
                <AccordionItem value="select-zone">
                    <AccordionTrigger
                        style={{
                            backgroundColor: "#fad749", borderRadius: "5px", paddingLeft: "3%",
                            paddingRight: "3%", marginTop: "1rem"
                        }}>Choose your section</AccordionTrigger>
                    <AccordionContent className="test"
                        style={{ marginTop: "1rem", height: "50rem" }}>
                        <div aligncontent="center">
                            <SeatingPlan setSelectedZone={setSelectedZone} selectedZone={selectedZone}
                                setSelectedCat={setSelectedCat} selectedCat={selectedCat} setSelectedPrice={setSelectedPrice}
                                selectedPrice={selectedPrice} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="number">
                    <AccordionTrigger
                        style={{
                            backgroundColor: "#fad749", borderRadius: "5px", paddingLeft: "3%",
                            paddingRight: "3%", marginTop: "1rem"
                        }}>Choose your tickets</AccordionTrigger>
                    <AccordionContent
                        style={{ marginTop: "1rem" }}>
                        <div style={{ textAlign: "center", border: "1px solid #1f6eb7", padding: "3%", backgroundColor: "#d8f0fd", borderRadius: "5px" }}>
                            The section you have selected is {selectedZone}
                        </div>
                        <div className="table" style={{
                            textAlign: "center", alignContent: "center", alignItems: "center",
                            border: "1px solid #464873", marginTop: "1rem", width: "100%", padding: "3%"
                        }}>
                            <div className="table-row table-header">
                                <div className="table-cell">Ticket Type</div>
                                <div className="table-cell">Price</div>
                                <div className="table-cell">Quantity</div>
                                <div className="table-cell">Info</div>
                            </div>
                            <div className="table-row">
                                <div className="table-cell">Standard</div>
                                <div className="table-cell">${selectedPrice}</div>
                                <div className="table-cell">
                                    <div>
                                        <select id="dropdown" value={selectedQuant} onChange={(e) => { setSelectedQuant(e.target.value) }} >
                                            <option value="">Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </div>
                                {
                                    isNaN({ total }) ? (<div className="table-cell">Your total bill is:<br></br>${selectedQuant * selectedPrice}</div>) : (<div className="table-cell">Your total bill is:<br></br>${total}</div>)
                                }
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


            <button disabled={!{ selectedPrice }} onClick={handleNext} style={{
                width: "10%", borderRadius: "5px", marginLeft: "45%", marginTop: "1rem",
                backgroundColor: "#2e6ad7", color: "white", marginBottom: "3rem"
            }}>Proceed</button>

            <style jsx>{`
                .table {
                    display: table;
                    font-size: 12px;
                    width: 100%;
                    border-collapse: collapse; /* To collapse the borders between cells */
                }
                
                .table-row {
                    display: table-row;
                    border: 1px solid #ccc; /* Add a border to each row */
                }
                
                .table-cell {
                    display: table-cell;
                    padding: 8px;
                    border: 1px solid #ccc; /* Add a border to each cell */
                }
                
                .table-header {
                    font-weight: bold;
                    background-color: #f0f0f0;
                }

            `} </style>
        </div>

    )
}

export default TicketPurchase;