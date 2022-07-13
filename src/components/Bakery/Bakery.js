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
import RecipeService from "../../services/recipe.service";

const Bakery = () => {
  const param = useParams();

  const { id } = param;
  const { recipes } = useCatalog();
  const { onAmount, onPerUnit, total, amount, perUnit } = useCardForm();
  const { title, setTitle, resetFlour, addFlour, data: dataFlour } = useFlour();
  const {
    resetIngredient,
    addIngredient,
    data: dataIngredient,
  } = useIngredient();

  let recipe = null;
  if (id !== "0" && recipes.length > 0) {
    recipe = recipes.find((row) => row.id === id);
  }

  useEffect(() => {
    if (recipe) {
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
  }, [recipe, resetFlour, setTitle, addFlour, resetIngredient, addIngredient]);

  let history = useHistory();

  const handleReturn = () => {
    history.push("/home");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleModify = async () => {
    const record = {
      name: title,
      order: {
        amount: amount,
        perUnit: perUnit,
      },
      flours: dataFlour.map((flour) => ({
        value: flour.value,
        ingredient: flour.ingredient,
        percentage: flour.percentage,
      })),
      ingredients: dataIngredient.map((ingredient) => ({
        value: ingredient.value,
        ingredient: ingredient.ingredient,
        percentage: ingredient.percentage,
      })),
    };

    if (id === "0") {
      const result = await RecipeService.create(record);
      console.log(result.data.message);
    } else {
      const result = await RecipeService.update(id, record);
      console.log(result.data.message);
    }
    history.push("/");
    window.location.reload();
  };

  const handleDelete = async () => {
    const result = await RecipeService.delete(id);
    console.log(result.data.message);
    history.push("/");
    window.location.reload();
  };

  const token = localStorage.getItem("token");
  const buttonTitle = id === "0" ? "Agregar" : "Modificar";
  return (
    <Fragment>
      <CardRecipe
        className="row d-flex align-items-center bg-primary border-bottom w-100"
        title={title}
        onAction={() => handleReturn()}
        typeIcon="home"
        type={token ? "input" : "header"}
        onTitleChange={token ? handleTitleChange : null}
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
      <div className="d-flex justify-content-around mt-2">
        {token && (
          <button
            className="btn btn-sm btn-custom-secondary w-25"
            onClick={handleModify}
          >
            {buttonTitle}
          </button>
        )}
        {token && id !== "0" && (
          <button
            className="btn btn-sm btn-custom-success w-25"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Bakery;
