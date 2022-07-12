import React, { Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import CardForm from "./BakeryCard/CardForm/CardForm";
import BakeryFlour from "./BakeryFlour";

import { useCatalog } from "../../store/catalog-context";
import { useCardForm } from "../../store/card-form-context";
import { useFlour } from "../../store/flour-context";
import { useIngredient } from "../../store/ingredient-context";

import BakeryIngredient from "./BakeryIngredient";
import BakeryTotal from "./BakeryTotal";

import CardRecipe from "../Bakery/BakeryCard/CardRecipe/CardRecipe";

const Bakery = () => {
  const param = useParams();

  const { id } = param;
  const { recipes } = useCatalog();
  const { onAmount, onPerUnit, total } = useCardForm();
  const { title, setTitle, resetFlour, addFlour } = useFlour();
  const { resetIngredient, addIngredient } = useIngredient();

  useEffect(() => {
    if (recipes.length > 0) {
      const recipe = recipes.find((row) => row.id === id);

      // Limpiar la data
      resetFlour();
      resetIngredient();

      // Tipo de pan
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
    id,
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
        title={title}
        onAction={() => handleReturn()}
        typeIcon="home"
      />
      <div className="mt-2 mb-2">
        <CardForm />
      </div>
      {total > 0 && (
        <div>
          <BakeryFlour />
          <div>
            <BakeryIngredient />
            <BakeryTotal />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Bakery;
