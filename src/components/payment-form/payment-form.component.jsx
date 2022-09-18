import { cardElement } from '@stripe/react-stripe-js';

import Button, { BUTTON_TYPE_CLASSES }from '../button/button.component';


const PaymentForm = () => {
    return (
        <div>
            <h1>Credit card: </h1>
            <cardElement />

            <Button type={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
        
        </div>
    )
};


export default PaymentForm;