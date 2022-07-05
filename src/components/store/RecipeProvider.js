import React, { useReducer } from "react";

import RecipeContext from "./recipe-context";
import FlourService from "../../services/flour.service";
import IngredientService from "../../services/ingredient.service";

import recipesBasic from "./data/recipesBasic.json";

const defaultState = {
  flours: [],
  ingredients: [],
  recipesBasic: recipesBasic,
  dataBasic: [],
};

const recipeReducer = (state, action) => {
  if (action.type === "ADD") {
    let data = [...state.data, action.row];

    // Ordenar la lista de recetas
    if (data.length > 0) {
      data = data.sort((row1, row2) => (row1.value > row2.value ? 1 : -1));
    }

    return {
      ...state,
      recipesBasic: state.recipesBasic,
      dataBasic: data,
    };
  }

  return defaultState;
};

const RecipeProvider = (props) => {
  const [recipeState, dispatchAction] = useReducer(recipeReducer, defaultState);

  const addDataBasicHandler = (row) => {
    dispatchAction({ type: "ADD", row });
  };

  const getRecipeContext = () => {
    // Consultar combo de harinas en BD
    const flours = FlourService.get().then((res) => {
      recipeContext.flours = res.data.body.map((item) => ({
        value: item._id,
        label: item.label,
      }));
    });

    // Consultar combo de ingredientes en BD

    const ingredients = IngredientService.get().then((res) => {
      recipeContext.ingredients = res.data.body.map((item) => ({
        value: item._id,
        label: item.label,
      }));
    });

    return {
      recipesBasic: recipeState.recipesBasic,
      flours: flours,
      ingredients: ingredients,
      dataBasic: recipeState.dataBasic,
      addDataBasic: addDataBasicHandler,
    };
  };

  const recipeContext = getRecipeContext();

  return (
    <RecipeContext.Provider value={recipeContext}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
