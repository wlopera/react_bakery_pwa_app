import React, { createContext, useCallback, useContext, useState } from "react";

const RecipeContext = createContext();

export const RecipeProvider = (props) => {
  const [dataBasic, setDataBasic] = useState([]);

  const addDataBasic = useCallback((recipes) => {
    setDataBasic(recipes);
  }, []);

  const value = {
    dataBasic,
    addDataBasic,
  };

  return (
    <RecipeContext.Provider value={value}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe debe estar dentro del proveedor RecipeProvider");
  }
  return context;
};
