import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

function CartIcon() {
    // For display on nav-bar
    // Handles logic for counting item in cart & displaying dropdown
    const { cartCount, cartOpen, setCartOpen } = useContext(CartContext);

    const toggleCartDropdown = () => setCartOpen(!cartOpen);

    return <div className='cart-icon-container' onClick={toggleCartDropdown}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{ cartCount }</span>
    </div>
}

export default CartIcon;