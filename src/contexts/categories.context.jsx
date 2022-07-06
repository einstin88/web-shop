import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import { addCollectionsAndDocuments } from "../utils/firebase/firebase.utils";
// import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export function CategoriesProvider({ children }) {
  const [categoriesMap, setCategoriesMap] = useState({});

  // Retrieve shop data from db
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  // To upload shop data to firestore
  // useEffect(() => {
  //   addCollectionsAndDocuments(SHOP_DATA)
  // }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
