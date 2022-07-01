import { createContext } from "react";

const BakeryContext = createContext({
  title: "",
  flours: [],
  data: [],
  percentages: 0,
  grams: 0,
  setTitle: (title) => {},
  resetFlour: () => {},
  addFlour: (row) => {},
  updateFlour: (row) => {},
  removeFlour: (id) => {},
  updateGrams: () => {},
});

export default BakeryContext;
