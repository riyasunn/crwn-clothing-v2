import styled from "styled-components";
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
    /* margin-top:200px; */
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 25px; 
    margin-bottom:70px;
    text-align: center;

`;

export const FormContainer = styled.form`
    height: 100px;
    min-width: 800px;
`;

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top:30px;
    min-width: 200px;
    height: 60px;
    letter-spacing: 0.5px;
    line-height: 60px;
    padding: 0 50px 0 50px;
    font-size: 25px;
`