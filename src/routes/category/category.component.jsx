import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";

import ProductCard from "../../components/products-card/products-card.component";

import "./category.styles.scss";

function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        
        {// This hack is needed because categoriesMap is empty initially when the component is mounted. 
        //Will be fixed when using local storage with redux
        products && products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
}

export default Category;
