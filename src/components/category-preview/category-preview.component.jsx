import { Link } from "react-router-dom";

import ProductCard from "../products-card/products-card.component";

import "./category-preview.styles.scss";

function CategoryPreview({ title, items }) {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {items
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default CategoryPreview;
