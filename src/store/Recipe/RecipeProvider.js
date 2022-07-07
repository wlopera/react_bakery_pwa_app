import React, { useReducer } from "react";

import RecipeContext from "./recipe-context";

const defaultState = {
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

  const recipeContext = {
    dataBasic: recipeState.dataBasic,
    addDataBasic: addDataBasicHandler,
  };

  return (
    <RecipeContext.Provider value={recipeContext}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
