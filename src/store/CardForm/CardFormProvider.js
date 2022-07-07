import React, { useCallback, useReducer } from "react";

import CardFormContext from "./card-form-context";

const defaultCardFormState = {
  amount: 0,
  perUnit: 0,
  total: 0,
};

const cardFormReducer = (state, action) => {
  if (action.type === "AMOUNT") {
    return {
      amount: action.value,
      perUnit: state.perUnit,
      total: action.value * state.perUnit,
    };
  }

  if (action.type === "PER_UNIT") {
    return {
      amount: state.amount,
      perUnit: action.value,
      total: action.value * state.amount,
    };
  }

  return defaultCardFormState;
};

const CardFormProvider = (props) => {
  const [cardFormState, dispatchCardFormState] = useReducer(
    cardFormReducer,
    defaultCardFormState
  );

  const onAmountHandler = useCallback((value) => {
    dispatchCardFormState({ type: "AMOUNT", value: value });
  }, []);

  const onPerUnitHandler = useCallback((value) => {
    dispatchCardFormState({ type: "PER_UNIT", value: value });
  }, []);

  const cardFormContext = {
    amount: cardFormState.amount,
    perUnit: cardFormState.perUnit,
    total: cardFormState.total,
    onAmount: onAmountHandler,
    onPerUnit: onPerUnitHandler,
  };

  return (
    <CardFormContext.Provider value={cardFormContext}>
      {props.children}
    </CardFormContext.Provider>
  );
};

export default CardFormProvider;
