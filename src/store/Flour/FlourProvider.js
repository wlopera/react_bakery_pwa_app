import React, { useCallback, useReducer } from "react";

import FlourContext from "./flour-context";

const defaultState = {
  title: "",
  data: [],
  percentages: 0,
  grams: 0,
};

const flourReducer = (state, action) => {
  if (action.type === "TITLE") {
    return { ...state, title: action.title };
  }

  if (action.type === "RESET") {
    return defaultState;
  }

  if (action.type === "ADD") {
    let data = [...state.data, action.row];

    // Ordenar la lista de harinas
    if (data.length > 0) {
      data = data.sort((row1, row2) => (row1.value > row2.value ? 1 : -1));
    }

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
    ...state,
    data: data,
    percentages: isValid
      ? Math.round(percentages.reduce((acc, item) => acc + item, 0) * 100) / 100
      : 0.0,
    grams: Math.round(grams.reduce((acc, item) => acc + item, 0) * 100) / 100,
  };
};

const FlourProvider = (props) => {
  const [flourState, dispatchAction] = useReducer(flourReducer, defaultState);

  const setTitleHandler = useCallback((title) => {
    dispatchAction({ type: "TITLE", title });
  }, []);

  const resetFlourHandler = useCallback(() => {
    dispatchAction({ type: "RESET" });
  }, []);

  const addFlourHandler = useCallback((row) => {
    dispatchAction({ type: "ADD", row });
  }, []);

  const updateFlourHandler = useCallback((row) => {
    dispatchAction({ type: "UPDATE", row });
  }, []);

  const updateGramsFlourHandler = useCallback((percentages, grams) => {
    dispatchAction({ type: "UPDATE_GRAMS", percentages, grams });
  }, []);

  const removeFlourHandler = useCallback((value) => {
    dispatchAction({ type: "REMOVE", value });
  }, []);

  const flourContext = {
    title: flourState.title,
    data: flourState.data,
    percentages: flourState.percentages,
    grams: flourState.grams,
    setTitle: setTitleHandler,
    resetFlour: resetFlourHandler,
    addFlour: addFlourHandler,
    updateFlour: updateFlourHandler,
    removeFlour: removeFlourHandler,
    updateGramsFlour: updateGramsFlourHandler,
  };

  return (
    <FlourContext.Provider value={flourContext}>
      {props.children}
    </FlourContext.Provider>
  );
};

export default FlourProvider;
