import React, { createContext, useCallback, useContext, useState } from "react";

const CardFormContext = createContext();

export const CardFormProvider = (props) => {
  const [amount, setAmount] = useState(0);
  const [perUnit, setPerUnit] = useState(0);
  const [total, setTotal] = useState(0);

  const onAmount = useCallback((value) => {
    setAmount(value);
    setPerUnit((currentValue) => {
      setTotal(value * currentValue !== 0 ? value * currentValue : value);
      return currentValue;
    });
  }, []);

  const onPerUnit = useCallback((value) => {
    setPerUnit(value);
    setAmount((currentValue) => {
      setTotal(value * currentValue !== 0 ? value * currentValue : value);
      return currentValue;
    });
  }, []);

  const value = {
    amount,
    perUnit,
    total,
    onAmount,
    onPerUnit,
  };

  return (
    <CardFormContext.Provider value={value}>
      {props.children}
    </CardFormContext.Provider>
  );
};

export const useCardForm = () => {
  const context = useContext(CardFormContext);
  if (!context) {
    throw new Error(
      "useCardForm debe estar dentro del proveedor CardFormProvider"
    );
  }
  return context;
};
