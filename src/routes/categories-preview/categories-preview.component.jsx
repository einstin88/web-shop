import { useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";


function CategoriesPreview() {
  // Display products for users to shop
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className="shop-container">
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          items={categoriesMap[title]}
        />
      ))}
    </div>
  );
}

export default CategoriesPreview;
