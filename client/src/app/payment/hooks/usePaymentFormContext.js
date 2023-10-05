import { useContext } from "react";
import PaymentFormContext from "../context/context";
import React from 'react'

const usePaymentFormContext = () => {
  return (
    useContext(PaymentFormContext)
  )
}

export default usePaymentFormContext;