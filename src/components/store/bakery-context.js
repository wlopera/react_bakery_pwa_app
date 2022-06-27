import { createContext } from "react";

const BakeryContext = createContext({
  flours: [],
  ingredients: [],
  dataFours: [],
  dataIngredients: [],
  percentageFlour: 0,
  gramsFlour: 0,
  percentageIngredient: 0,
  gramsIngredient: 0,
  addRowFlour: (row) => {},
  updateRowFlour: (row) => {},
  removeRowFlour: (id) => {},
});

export default BakeryContext;
