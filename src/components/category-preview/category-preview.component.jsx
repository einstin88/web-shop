import ProductCard from "../products-card/products-card.component";

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";

function CategoryPreview({ title, items }) {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>
          {title.toUpperCase()}
        </Title>
      </h2>
      <Preview>
        {items
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
}

export default CategoryPreview;
