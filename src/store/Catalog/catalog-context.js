import { createContext } from "react";

const CatalogContext = createContext({
  flours: [],
  ingredients: [],
  setCatalogs: (catalogs) => {},
});

export default CatalogContext;
