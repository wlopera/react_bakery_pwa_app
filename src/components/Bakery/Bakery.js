import React, { Fragment, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import CardForm from "./BakeryCard/CardForm/CardForm";
import BakeryFlour from "./BakeryFlour";

import CatalogContext from "../../store/Catalog/catalog-context";
import RecipeContext from "../../store/Recipe/recipe-context";
import CardFormContext from "../../store/CardForm/card-form-context";
import FlourContext from "../../store/Flour/flour-context";
import IngredientContext from "../../store/Ingredient/ingredient-context";

import BakeryIngredient from "./BakeryIngredient";
import BakeryTotal from "./BakeryTotal";

import CardRecipe from "../Bakery/BakeryCard/CardRecipe/CardRecipe";

const Bakery = () => {
  const catalogCtx = useContext(CatalogContext);
  const cardFormCtx = useContext(CardFormContext);
  const recipeCtx = useContext(RecipeContext);
  const flourCtx = useContext(FlourContext);
  const ingredientCtx = useContext(IngredientContext);
  const param = useParams();

  const { recipes } = catalogCtx;
  const { onAmount, onPerUnit } = cardFormCtx;
  const { resetFlour, setTitle, addFlour } = flourCtx;
  const { resetIngredient, addIngredient } = ingredientCtx;

  useEffect(() => {
    if (recipes.length > 0) {
      const recipe = recipes.find((row) => row.id === param.id);

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
    }
  }, [
    param.id,
    recipes,
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
