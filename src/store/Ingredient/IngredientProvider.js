import React, { useCallback, useReducer } from "react";

import IngredientContext from "./ingredient-context";

const defaultState = {
  data: [],
  percentages: 0,
  grams: 0,
};

const ingredientReducer = (state, action) => {
  if (action.type === "RESET") {
    return defaultState;
  }

  if (action.type === "ADD") {
    let data = [...state.data, action.row];

    // Ordenar la lista de ingredientes
    data = data.sort((row1, row2) =>
      row1.ingredient > row2.ingredient ? 1 : -1
    );
    return processData(data, state);
  }

  if (action.type === "UPDATE") {
    const data = state.data.map((item) => {
      if (item.value === action.row.value) {
        return {
          ...item,
          percentage: action.row.percentage,
          grams: action.row.grams,
        };
      }
      return item;
    });
    return processData(data, state);
  }

  if (action.type === "UPDATE_GRAMS") {
    const percentages = action.percentages;
    const grams = action.grams;

    const data = state.data.map((item) => {
      return {
        ...item,
        grams:
          Math.round(((item.percentage * grams) / percentages) * 100) / 100,
      };
    });
    return processData(data, state);
  }

  if (action.type === "REMOVE") {
    const data = state.data.filter((item) => item.value !== action.value);
    return processData(data, state);
  }

  return defaultState;
};

const processData = (data, state) => {
  // Porcentajes de harinas
  const percentages =
    data.length > 0 ? data.map((item) => parseFloat(item.percentage)) : [];

  // Porcentajes de gramos de harinas
  const grams =
    data.length > 0 ? data.map((item) => parseFloat(item.grams)) : [];

  let isValid = true;
  for (let index = 0; index < percentages.length; index++) {
    if (isNaN(percentages[index])) {
      isValid = false;
      break;
    }
  }

  return {
    data: data,
    percentages: isValid
      ? Math.round(percentages.reduce((acc, item) => acc + item, 0) * 100) / 100
      : 0,
    grams: Math.round(grams.reduce((acc, item) => acc + item, 0) * 100) / 100,
  };
};

const IngredientProvider = (props) => {
  const [ingredientState, dispatchAction] = useReducer(
    ingredientReducer,
    defaultState
  );

  const resetIngredientHandler = useCallback(() => {
    dispatchAction({ type: "RESET" });
  }, []);
  const addIngredientHandler = useCallback((row) => {
    dispatchAction({ type: "ADD", row: row });
  }, []);

  const updateIngredientHandler = useCallback((row) => {
    dispatchAction({ type: "UPDATE", row: row });
  }, []);

  const updateGramsIngredientHandler = useCallback((percentages, grams) => {
    dispatchAction({ type: "UPDATE_GRAMS", percentages, grams });
  }, []);

  const removeIngredientHandler = useCallback((value) => {
    dispatchAction({ type: "REMOVE", value: value });
  }, []);

  const ingredientContext = {
    data: ingredientState.data,
    percentages: ingredientState.percentages,
    grams: ingredientState.grams,
    resetIngredient: resetIngredientHandler,
    addIngredient: addIngredientHandler,
    updateIngredient: updateIngredientHandler,
    removeIngredient: removeIngredientHandler,
    updateGramsIngredient: updateGramsIngredientHandler,
  };

  return (
    <IngredientContext.Provider value={ingredientContext}>
      {props.children}
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;
