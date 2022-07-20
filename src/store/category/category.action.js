import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import CATEGORY_ACTION_TYPES from "./category.types";

// Thunks can be used to better manage action flows in async functions
function fetchCategoriesStart() {
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);
}

function fetchCategoriesSuccess(categories) {
  return createAction(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCESSS,
    categories
  );
}

function fetchCategoriesFailed(error) {
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
}

export function fetchCategoriesAsync() {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error));
    }
  };
}
