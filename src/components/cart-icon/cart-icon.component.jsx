import {ReactComponent as ShoppingSvg } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import {ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
         <ShoppingIcon as={ShoppingSvg} className='shopping-icon'/>
         <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;
