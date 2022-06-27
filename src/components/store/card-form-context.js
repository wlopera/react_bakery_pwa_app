import { createContext } from "react";

const CardFormContext = createContext({
  amount: 0,
  perUnit: 0,
  total: 0,
  onAmount: (value) => {},
  onPerUnit: (value) => {},
});

export default CardFormContext;
