import React, { createContext, useCallback, useContext, useState } from "react";

const CatalogContext = createContext();

export const CatalogProvider = (props) => {
  const [flours, setFlours] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const setCatalogs = useCallback((catalogs) => {
    setFlours(catalogs.flours);
    setIngredients(catalogs.ingredients);
    setRecipes(catalogs.recipes);
  }, []);

  const value = {
    flours,
    ingredients,
    recipes,
    setCatalogs,
  };

  return (
    <CatalogContext.Provider value={value}>
      {props.children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error(
      "useCatalog debe estar dentro del proveedor CatalogProvider"
    );
  }
  return context;
};
