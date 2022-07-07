import { createContext } from "react";

const RecipeContext = createContext({
  dataBasic: [],
  addDataBasic: (row) => {},
});

export default RecipeContext;
