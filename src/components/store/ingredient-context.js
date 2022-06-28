import { createContext } from "react";

const IngredientContext = createContext({
  ingredients: [],
  data: [],
  percentages: 0,
  grams: 0,
  addIngredient: (row) => {},
  updateIngredient: (row) => {},
  removeIngredient: (id) => {},
});

export default IngredientContext;
