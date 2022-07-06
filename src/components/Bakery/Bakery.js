import React, { Fragment, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import CardForm from "./BakeryCard/CardForm";
import BakeryFlour from "./BakeryFlour";

import RecipeContext from "../../store/Recipe/recipe-context";
import CardFormContext from "../../store/CardForm/card-form-context";
import FlourContext from "../../store/Flour/flour-context";
import IngredientContext from "../../store/Ingredient/ingredient-context";

import BakeryIngredient from "./BakeryIngredient";
import BakeryTotal from "./BakeryTotal";

import CardRecipe from "../Bakery/BakeryCard/CardRecipe";

const Bakery = () => {
  const cardFormCtx = useContext(CardFormContext);
  const recipeCtx = useContext(RecipeContext);
  const flourCtx = useContext(FlourContext);
  const ingredientCtx = useContext(IngredientContext);
  const param = useParams();

  const { onAmount, onPerUnit } = cardFormCtx;
  const { resetFlour, setTitle, addFlour } = flourCtx;
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
        className="row d-flex align-items-center bg-primary border-bottom w-100"
        title={flourCtx.title}
        onAction={() => handleReturn()}
        typeIcon="home"
      />
      <div className="mt-2 mb-2">
        <CardForm />
      </div>
      {cardFormCtx.total > 0 && (
        <div>
          <BakeryFlour />
          {/* {flourCtx.percentages === 100 && ( */}
          <div>
            <BakeryIngredient />
            <BakeryTotal />
          </div>
          {/* )} */}
        </div>
      )}
    </Fragment>
  );
};

export default Bakery;
