import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

function CheckoutItem({ item }) {
  const { name, imageUrl, quantity, price } = item;
  const { addItemToCart, reduceItemInCart, removeItemInCart } =
    useContext(CartContext);

  const increment = () => addItemToCart(item);
  const decrement = () => reduceItemInCart(item);
  const removal = () => removeItemInCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <span className="name">{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={decrement}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={increment}>
          &#10095;
        </span>
      </div>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={removal}>&#10005;</span>
    </div>
  );
}

export default CheckoutItem;
