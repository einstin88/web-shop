import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";

import ProductCard from "../../components/products-card/products-card.component";

import "./shop.styles.scss";

function Shop() {
  // Display products for users to shop

  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default Shop;
