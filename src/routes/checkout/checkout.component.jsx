// import { useContext } from 'react';
// import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';
// import { useSelector } from 'react-redux';
// import { SelectCartItem } from '../../store/cart/cart.selector';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemToCart, clearItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    // const { cartItems, cartTotal } = useContext(CartContext);
    


    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
                {cartItems.map((cartItem) =>
                  <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                )}
                <span className='total'>Total: ${cartTotal}</span>
                <PaymentForm />
        </div>
    )
};
export default Checkout;