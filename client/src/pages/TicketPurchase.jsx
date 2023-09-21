import React from "react";
import SeatingPlan from "./SeatingPlan";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useState } from "react";


const TicketPurchase = ()  => {
    const [selectedZone, setSelectedZone] = useState();
    const [selectedCat, setSelectedCat] = useState();
    const [selectedPrice, setSelectedPrice] = useState();
    const [selectedQuant, setSelectedQuant] = useState();

    const changeQuant = (q) => {
        setSelectedQuant(q.target.value);
    };
    const total = selectedPrice * selectedQuant;
    return (
        <div>
            <Accordion type="multiple" style={{ width:"80%", marginLeft:"10%", marginRight:"10%"}}>
                <AccordionItem value="select-zone">
                    <AccordionTrigger
                        style={{backgroundColor:"#fad749", borderRadius:"5px", paddingLeft:"3%",
                        paddingRight:"3%", marginTop:"1rem"}}>Choose your section</AccordionTrigger>
                    <AccordionContent className="test"
                        style ={{ marginTop:"1rem", height:"50rem"}}>
                        <div  alignContent="center">
                            <SeatingPlan setSelectedZone={setSelectedZone} selectedZone={selectedZone}
                            setSelectedCat={setSelectedCat} selectedCat={selectedCat} setSelectedPrice={setSelectedPrice}
                            selectedPrice={selectedPrice} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="number">
                    <AccordionTrigger
                        style={{backgroundColor:"#fad749", borderRadius:"5px", paddingLeft:"3%",
                        paddingRight:"3%", marginTop:"1rem"}}>Choose your tickets</AccordionTrigger>
                    <AccordionContent
                    style ={{marginTop:"1rem"}}>
                        <div style={{textAlign:"center", border:"1px solid #1f6eb7", padding:"3%", backgroundColor:"#d8f0fd", borderRadius:"5px"}}>
                            The section you have selected is {selectedZone}
                        </div>
                        <div className="table" style={{textAlign:"center",alignContent:"center",alignItems:"center",
                            border:"1px solid #464873", marginTop:"1rem", width:"100%", padding:"3%"}}>
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
                                    <select id="dropdown" value={selectedQuant} onChange={changeQuant} >
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                </div>
                                {
                                    isNaN(total) ?  (<div className="table-cell">Your total bill is:<br></br>$0</div>) : (<div className="table-cell">Your total bill is:<br></br>${total}</div>)
                                }
                                
                                
                            </div>
                        </div>
                    </AccordionContent>
            </AccordionItem>
            </Accordion>

            
            <button disabled= {!{selectedPrice}} style={{width:"10%", borderRadius:"5px", marginLeft:"45%", marginTop:"1rem",
            backgroundColor:"#2e6ad7", color:"white", marginBottom:"3rem"}}>Proceed</button>

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