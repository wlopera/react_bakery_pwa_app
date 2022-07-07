import React, { useCallback, useReducer } from "react";

import CatalogContext from "./catalog-context";

const defaultState = {
  flours: [],
  ingredients: [],
  recipes: [],
};

const catalogReducer = (state, action) => {
  if (action.type === "SET") {
    return {
      flours: action.catalogs.flours,
      ingredients: action.catalogs.ingredients,
      recipes: action.catalogs.recipes,
    };
  }
  return defaultState;
};

const CatalogProvider = (props) => {
  const [catalogState, dispatchAction] = useReducer(
    catalogReducer,
    defaultState
  );

  const setCatalogsHandler = useCallback((catalogs) => {
    dispatchAction({ type: "SET", catalogs });
  }, []);

  const catalogContext = {
    flours: catalogState.flours,
    ingredients: catalogState.ingredients,
    recipes: catalogState.recipes,
    setCatalogs: setCatalogsHandler,
  };

  return (
    <CatalogContext.Provider value={catalogContext}>
      {props.children}
    </CatalogContext.Provider>
  );
};

export default CatalogProvider;
