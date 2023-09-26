"use client"
import { createContext, useState, useEffect } from "react";

const PaymentFormContext = createContext({});

export const FormProvider = ({children}) => {
    const title = {
        0: "Seat Selection",
        1: "Confirmation",
    };
    const [page, setPage] = useState(0);
    const [selectedZone, setSelectedZone] = useState();
    const [selectedCat, setSelectedCat] = useState();
    const [selectedPrice, setSelectedPrice] = useState();
    const [selectedQuant, setSelectedQuant] = useState(0);

    return (
        <PaymentFormContext.Provider value={{title, page, setPage, selectedZone, setSelectedZone, selectedCat, setSelectedCat,
                                    selectedPrice, setSelectedPrice, selectedQuant, setSelectedQuant}}>
            {children}
        </PaymentFormContext.Provider>
    )
}

export default PaymentFormContext;
