import React, { createContext, useCallback, useContext, useState } from "react";

const CardFormContext = createContext();

export const CardFormProvider = (props) => {
  const [amount, setAmount] = useState(1);
  const [perUnit, setPerUnit] = useState(1);
  const [total, setTotal] = useState(1);

  const onAmount = useCallback(
    (value) => {
      setAmount(value);
      setTotal(value * perUnit);
    },
    [perUnit]
  );

  const onPerUnit = useCallback(
    (value) => {
      setPerUnit(value);
      setTotal(value * amount);
    },
    [amount]
  );

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
