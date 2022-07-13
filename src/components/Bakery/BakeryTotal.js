import React, { useEffect } from "react";
import CardHeader from "./BakeryCard/Card/CardHeader";

import { useCardForm } from "../../store/card-form-context";
import { useFlour } from "../../store/flour-context";
import { useIngredient } from "../../store/ingredient-context";

const BakeryTotal = () => {
  const { total, amount, perUnit } = useCardForm();
  const { percentages, grams, updateGramsFlour } = useFlour();
  const ingredientUSE = useIngredient();

  const newPercentages = percentages + ingredientUSE.percentages;
  const newGrams = grams + ingredientUSE.grams;
  const { updateGramsIngredient } = ingredientUSE;

  useEffect(() => {
    updateGramsFlour(newPercentages, amount * perUnit);
    updateGramsIngredient(newPercentages, amount * perUnit);
  }, [
    newPercentages,
    total,
    updateGramsFlour,
    updateGramsIngredient,
    amount,
    perUnit,
  ]);

  const perGramsTotal = Math.round(newGrams * 100) / 100;

  return (
    <CardHeader
      percentageTitle={newPercentages}
      gramTitle={perGramsTotal}
      className="row d-flex align-items-center bg-primary w-100"
    />
  );
};

export default BakeryTotal;
