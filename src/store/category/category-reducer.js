import CATEGORY_ACTION_TYPES from "./category.types";

const CATEGORY_INITIAL_STATE = {
  categoriesMap: {},
};

export function categoryReducer(state = CATEGORY_INITIAL_STATE, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload,
      };
    default:
      return state;
  }
}