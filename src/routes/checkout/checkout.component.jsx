import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutContainer,
  Header,
  HeaderBlock,
  Total,
} from "./checkout.styles";

const HEADERS = ["Product", "Description", "Quantity", "Price", "Remove"];

function Checkout() {
  const { cartList, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <Header>
        {HEADERS.map((header) => {
          return <HeaderBlock key={header}>{header}</HeaderBlock>;
        })}
      </Header>
      {cartList.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;
