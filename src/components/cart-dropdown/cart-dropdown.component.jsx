import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

import { CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles";

function CartDropdown() {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate();

  const toCheckOut = () => navigate("/checkout");

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartList.length ? (
          cartList.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={toCheckOut} >CHECKOUT</Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
