import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Button, { BUTTON_TYPE_CLASSES }from '../button/button.component';

import { PaymentFormContainer, FormContainer } from './payment-form.styles';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();
        if(!stripe || !elements) {
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            
        })

    }
    return (
        <PaymentFormContainer>
            <FormContainer>
                <h1>Credit card payment: </h1>
                <CardElement />

                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
};


export default PaymentForm;