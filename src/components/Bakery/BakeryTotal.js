import React, { useContext, useEffect } from "react";
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
  const { updateGramsFlour } = bakeryCtx;
  const { updateGramsIngredient } = ingredientCtx;

  useEffect(() => {
    updateGramsFlour(percentages, gramsTotal);
    updateGramsIngredient(percentages, gramsTotal);
  }, [percentages, gramsTotal, updateGramsFlour, updateGramsIngredient]);

  return <CardHeader percentageTitle={percentages} gramTitle={grams} />;
};

export default BakeryTotal;
