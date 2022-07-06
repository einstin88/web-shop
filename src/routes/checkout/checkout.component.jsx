import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const HEADERS = ["Product", "Description", "Quantity", "Price", "Remove"];

function Checkout() {
  const { cartList, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {HEADERS.map((header) => {
          return (
            <div key={header} className="header-block">
              {header}
            </div>
          );
        })}
      </div>
      {cartList.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
}

export default Checkout;
