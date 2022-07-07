import { createContext } from "react";

const CatalogContext = createContext({
  flours: [],
  ingredients: [],
  recipes: [],
  setCatalogs: (catalogs) => {},
});

export default CatalogContext;
