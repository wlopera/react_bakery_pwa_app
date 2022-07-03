import React, { Fragment, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import CardForm from "./BakeryCard/CardForm";
import BakeryFlour from "./BakeryFlour";

import RecipeContext from "../store/recipe-context";
import CardFormContext from "../store/card-form-context";
import BakeryContext from "../store/bakery-context";
import IngredientContext from "../store/ingredient-context";

import BakeryIngredient from "./BakeryIngredient";
import BakeryTotal from "./BakeryTotal";

import CardRecipe from "../Bakery/BakeryCard/CardRecipe";

const Bakery = () => {
  const cardFormCtx = useContext(CardFormContext);
  const recipeCtx = useContext(RecipeContext);
  const bakeryCtx = useContext(BakeryContext);
  const ingredientCtx = useContext(IngredientContext);
  const param = useParams();

  const { onAmount, onPerUnit } = cardFormCtx;
  const { resetFlour, setTitle, addFlour } = bakeryCtx;
  const { resetIngredient, addIngredient } = ingredientCtx;

  useEffect(() => {
    const recipe = recipeCtx.recipesBasic.find(
      (row) => row.id === parseInt(param.id)
    );

    // Limpiar la data
    resetFlour();
    resetIngredient();

    //Tipo de pan
    setTitle(recipe.name);

    // Orden
    onAmount(recipe.order.amount);
    onPerUnit(recipe.order.perUnit);

    // harinas
    recipe.flours.forEach((row) => {
      addFlour({
        id: row.id,
        key: row.id,
        value: row.value,
        ingredient: row.ingredient,
        percentage: row.percentage,
        grams: 0,
      });
    });

    //Otros Ingredientes
    recipe.ingredients.forEach((row) => {
      addIngredient({
        id: row.id,
        key: row.id,
        value: row.value,
        ingredient: row.ingredient,
        percentage: row.percentage,
        grams: 0,
      });
    });
  }, [
    param.id,
    recipeCtx.recipesBasic,
    onAmount,
    onPerUnit,
    resetFlour,
    setTitle,
    addFlour,
    resetIngredient,
    addIngredient,
  ]);

  let history = useHistory();

  const handleReturn = () => {
    history.push("/home");
  };

  return (
    <Fragment>
      <CardRecipe
        className="row d-flex align-items-center bg-primary border-bottom w-50"
        title={bakeryCtx.title}
        onAction={() => handleReturn()}
        typeIcon="home"
      />
      <CardForm />
      {cardFormCtx.total > 0 && (
        <div>
          <BakeryFlour />
          {bakeryCtx.percentages === 100 && (
            <div>
              <BakeryIngredient />
              <BakeryTotal />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Bakery;
