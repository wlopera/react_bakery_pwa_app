import React, { useCallback, useContext, useEffect } from "react";
import CardHeader from "./BakeryCard/CardHeader";

import BakeryContext from "../store/bakery-context";
import IngredientContext from "../store/ingredient-context";
import CardFormContext from "../store/card-form-context";

const BakeryTotal = () => {
  const bakeryCtx = useContext(BakeryContext);
  const ingredientCtx = useContext(IngredientContext);
  const cardFormCtx = useContext(CardFormContext);

  const percentages = bakeryCtx.percentages + ingredientCtx.percentages;
  const grams = bakeryCtx.grams + ingredientCtx.grams;
  const gramsTotal = cardFormCtx.total;
  const { updateGrams: updateGramsFlour } = bakeryCtx;
  const { updateGrams: updateGramsIngredient } = ingredientCtx;

  const addRowHandler = () => {
    updateGramsFlour(percentages, gramsTotal);
    updateGramsIngredient(percentages, gramsTotal);
  };

  return (
    <CardHeader
      percentageTitle={percentages}
      gramTitle={grams}
      onAdd={addRowHandler}
    />
  );
};

export default BakeryTotal;
