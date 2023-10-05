"use client"
import Confirmation from "../confirmation/page";
import TicketPurchase from "../seat-selection/page";
import usePaymentFormContext from "../hooks/usePaymentFormContext";
import Loader from "../loader/page";

const PaymentFormInputs = () => {

    const {page} = usePaymentFormContext();
    console.log(page)
    const display = {
        0: <TicketPurchase />,
        1: <Confirmation />,
        2: <Loader />,
    }

    const content = (
        <div>
            {display[page]}
        </div>
    )

    return content;
}

export default PaymentFormInputs;