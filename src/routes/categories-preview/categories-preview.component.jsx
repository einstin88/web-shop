import { Fragment } from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import { categoryReducer } from "../../store/category/category-reducer";


function CategoriesPreview() {
  // Display products for users to shop
  const categoriesMap = useSelector(categoryReducer);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          items={categoriesMap[title]}
        />
      ))}
    </Fragment>
  );
}

export default CategoriesPreview;
