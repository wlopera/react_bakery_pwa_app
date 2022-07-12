import React, { useContext, useEffect } from "react";
import CardHeader from "./BakeryCard/Card/CardHeader";

import FlourContext from "../../store/Flour/flour-context";
import IngredientContext from "../../store/Ingredient/ingredient-context";
import { useCardForm } from "../../store/CardForm/card-form-context";

const BakeryTotal = () => {
  const flourCtx = useContext(FlourContext);
  const ingredientCtx = useContext(IngredientContext);
  const { total } = useCardForm();

  const percentages = flourCtx.percentages + ingredientCtx.percentages;
  const grams = flourCtx.grams + ingredientCtx.grams;
  const gramsTotal = total;
  const { updateGramsFlour } = flourCtx;
  const { updateGramsIngredient } = ingredientCtx;

  useEffect(() => {
    updateGramsFlour(percentages, gramsTotal);
    updateGramsIngredient(percentages, gramsTotal);
  }, [percentages, gramsTotal, updateGramsFlour, updateGramsIngredient]);

  const perGramsTotal = Math.round(grams * 100) / 100;

  return (
    <CardHeader
      percentageTitle={percentages}
      gramTitle={perGramsTotal}
      className="row d-flex align-items-center bg-primary w-100"
    />
  );
};

export default BakeryTotal;
