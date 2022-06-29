import { createContext } from "react";

const BakeryContext = createContext({
  flours: [],
  data: [],
  percentages: 0,
  grams: 0,
  addFlour: (row) => {},
  updateFlour: (row) => {},
  removeFlour: (id) => {},
  updateGrams: () => {},
});

export default BakeryContext;
