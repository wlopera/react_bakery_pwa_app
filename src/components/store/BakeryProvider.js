import React, { useReducer } from "react";

import BakeryContext from "./bakery-context";

import flours from "./flours.json";
import ingredients from "./ingredients.json";

const defaultBakeryState = {
  flours: flours,
  ingredients: ingredients,
  dataFours: [],
  dataIngredients: [],
  percentageFlour: 0,
  gramsFlour: 0,
  percentageIngredient: 0,
  gramsIngredient: 0,
};

const bakeryReducer = (state, action) => {
  if (action.type === "ADD") {
    const data = [...state.dataFours, action.row];

    // Ordenar la listado de harinas
    data.sort((row1, row2) => (row1.value > row2.value ? 1 : -1));

    // Porcentajes de harinas
    const percentagesFlour =
      data.length > 0 ? data.map((item) => parseFloat(item.percentage)) : [];

    // Porcentajes de gramos de harinas
    const gramsFlour =
      data.length > 0 ? data.map((item) => parseFloat(item.grams)) : [];

    return {
      flours: state.flours,
      dataFours: data,
      percentageFlour:
        Math.round(
          percentagesFlour.reduce((acc, item) => acc + item, 0) * 100
        ) / 100,
      gramsFlour:
        Math.round(gramsFlour.reduce((acc, item) => acc + item, 0) * 100) / 100,
    };
  }

  if (action.type === "UPDATE") {
    const data = state.dataFours.map((item) => {
      if (item.id === action.row.id) {
        return {
          ...item,
          percentage: action.row.percentage,
          grams: action.row.grams,
        };
      }
      return item;
    });

    // Porcentajes de harinas
    const percentagesFlour =
      data.length > 0 ? data.map((item) => parseFloat(item.percentage)) : [];

    // Porcentajes de gramos de harinas
    const gramsFlour =
      data.length > 0 ? data.map((item) => parseFloat(item.grams)) : [];

    return {
      flours: state.flours,
      dataFours: data,
      percentageFlour:
        Math.round(
          percentagesFlour.reduce((acc, item) => acc + item, 0) * 100
        ) / 100,
      gramsFlour:
        Math.round(gramsFlour.reduce((acc, item) => acc + item, 0) * 100) / 100,
    };
  }

  if (action.type === "REMOVE") {
    const data = state.dataFours.filter((item) => item.id !== action.id);

    // Porcentajes de harinas
    const percentagesFlour =
      data.length > 0 ? data.map((item) => parseFloat(item.percentage)) : [];

    // Porcentajes de gramos de harinas
    const gramsFlour =
      data.length > 0 ? data.map((item) => parseFloat(item.grams)) : [];

    return {
      flours: state.flours,
      dataFours: data,
      percentageFlour:
        Math.round(
          percentagesFlour.reduce((acc, item) => acc + item, 0) * 100
        ) / 100,
      gramsFlour:
        Math.round(gramsFlour.reduce((acc, item) => acc + item, 0) * 100) / 100,
    };
  }

  return defaultBakeryState;
};

const BakeryProvider = (props) => {
  const [bakeryState, dispatchBakeryAction] = useReducer(
    bakeryReducer,
    defaultBakeryState
  );

  const addRowToBakeryHandler = (row) => {
    dispatchBakeryAction({ type: "ADD", row: row });
  };

  const updateRowToBakeryHandler = (row) => {
    dispatchBakeryAction({ type: "UPDATE", row: row });
  };

  const removeRowToBakeryHandler = (id) => {
    dispatchBakeryAction({ type: "REMOVE", id: id });
  };

  const bakeryContext = {
    flours: bakeryState.flours,
    ingredients: bakeryState.ingredients,
    dataFours: bakeryState.dataFours,
    dataIngredients: bakeryState.dataIngredients,
    percentageFlour: bakeryState.percentageFlour,
    percentageTotal: bakeryState.percentageTotal,
    addRowFlour: addRowToBakeryHandler,
    updateRowFlour: updateRowToBakeryHandler,
    removeRowFlour: removeRowToBakeryHandler,
  };

  return (
    <BakeryContext.Provider value={bakeryContext}>
      {props.children}
    </BakeryContext.Provider>
  );
};

export default BakeryProvider;
