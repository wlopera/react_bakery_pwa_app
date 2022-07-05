import { createContext } from "react";

const RecipeContext = createContext({
  recipesBasic: [],
  flours: [],
  ingredients: [],
  dataBasic: [],
  addDataBasic: (row) => {},
});

export default RecipeContext;
