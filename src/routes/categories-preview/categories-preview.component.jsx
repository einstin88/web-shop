import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/category/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

function CategoriesPreview() {
  // Display products for users to shop
  const categoriesMap = useSelector(selectCategoriesMap);

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
