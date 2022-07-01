import React, { useCallback, useReducer } from "react";

import BakeryContext from "./bakery-context";

import flours from "./data/flours.json";

const defaultState = {
  flours: flours,
  data: [],
  percentages: 0,
  grams: 0,
};

const bakeryReducer = (state, action) => {
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
      if (item.id === action.row.id) {
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
    const data = state.data.filter((item) => item.id !== action.id);
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
    flours: state.flours,
    data: data,
    percentages: isValid
      ? Math.round(percentages.reduce((acc, item) => acc + item, 0) * 100) / 100
      : 0.0,
    grams: Math.round(grams.reduce((acc, item) => acc + item, 0) * 100) / 100,
  };
};

const BakeryProvider = (props) => {
  const [bakeryState, dispatchAction] = useReducer(bakeryReducer, defaultState);

  const addFlourHandler = (row) => {
    dispatchAction({ type: "ADD", row });
  };

  const updateFlourHandler = (row) => {
    dispatchAction({ type: "UPDATE", row });
  };

  const updateGramsFlourHandler = useCallback((percentages, grams) => {
    dispatchAction({ type: "UPDATE_GRAMS", percentages, grams });
  }, []);

  const removeFlourHandler = (id) => {
    dispatchAction({ type: "REMOVE", id });
  };

  const bakeryContext = {
    flours: bakeryState.flours,
    data: bakeryState.data,
    percentages: bakeryState.percentages,
    grams: bakeryState.grams,
    addFlour: addFlourHandler,
    updateFlour: updateFlourHandler,
    removeFlour: removeFlourHandler,
    updateGramsFlour: updateGramsFlourHandler,
  };

  return (
    <BakeryContext.Provider value={bakeryContext}>
      {props.children}
    </BakeryContext.Provider>
  );
};

export default BakeryProvider;
