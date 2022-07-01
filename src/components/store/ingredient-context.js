import { createContext } from "react";

const IngredientContext = createContext({
  ingredients: [],
  data: [],
  percentages: 0,
  grams: 0,
  resetIngredient: () => {},
  addIngredient: (row) => {},
  updateIngredient: (row) => {},
  removeIngredient: (id) => {},
  updateGrams: () => {},
});

export default IngredientContext;
