import { createContext } from "react";

const RecipeContext = createContext({
  recipesBasic: [],
  dataBasic: [],
  addDataBasic: (row) => {},
});

export default RecipeContext;
