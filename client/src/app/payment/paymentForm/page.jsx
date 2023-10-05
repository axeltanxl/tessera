import PaymentFormInputs from "../component/PaymentFormInput";
import usePaymentFormContext from "../hooks/usePaymentFormContext";
import { FormProvider } from "../context/context";

const PaymentForm = () => {

    const content = (
        
        <div>
            <FormProvider>
                <PaymentFormInputs />
            </FormProvider>
            
        </div>
    )
    return content
}

export default PaymentForm