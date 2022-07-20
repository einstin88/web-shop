import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCategoriesMap } from "../../store/category/category.selector";

import ProductCard from "../../components/products-card/products-card.component";

import { CategoryContainer, CategoryTitle } from "./category.styles";

function Category() {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          // This hack is needed because categoriesMap is empty initially when the component is mounted.
          //Will be fixed when using local storage with redux
          products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </CategoryContainer>
    </Fragment>
  );
}

export default Category;
