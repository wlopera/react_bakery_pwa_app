import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CardTitle from "../Bakery/BakeryCard/CardTitle";
import CardRecipe from "../Bakery/BakeryCard/CardRecipe";

import RecipeContext from "../store/recipe-context";
import BakeryContext from "../store/bakery-context";
import IngredientContext from "../store/ingredient-context";
import CardFormContext from "../store/card-form-context";

const Home = () => {
  const [dataBasic, setDataBasic] = useState([]);
  const recipesCtx = useContext(RecipeContext);
  const bakeryCtx = useContext(BakeryContext);
  const ingredientContext = useContext(IngredientContext);
  const cardFormContext = useContext(CardFormContext);
  let history = useHistory();

  useEffect(() => {
    const data = recipesCtx.recipesBasic.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      order: recipe.order,
      flours: recipe.flours,
      ingredients: recipe.ingredients,
    }));

    setDataBasic(data);
  }, [recipesCtx]);

  const handleInit = (recipe) => {
    // Limpiar la data
    bakeryCtx.resetFlour();
    ingredientContext.resetIngredient();

    //Tipo de pan
    bakeryCtx.setTitle(recipe.name);

    // Orden
    cardFormContext.onAmount(recipe.order.amount);
    cardFormContext.onPerUnit(recipe.order.perUnit);

    // harinas
    recipe.flours.forEach((row) => {
      bakeryCtx.addFlour({
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
      ingredientContext.addIngredient({
        id: row.id,
        key: row.id,
        value: row.value,
        ingredient: row.ingredient,
        percentage: row.percentage,
        grams: 0,
      });
    });

    history.push("/bakery");
  };

  const recipeList = dataBasic.map((row) => (
    <div key={row.id}>
      <CardRecipe
        title={row.name}
        onAction={() => handleInit(row)}
        typeIcon="action"
      />
      <div className="mb-2"></div>
    </div>
  ));

  return (
    <div>
      <CardTitle title="RECETAS PANADERO - PASTELERO" />
      <ul className="list-unstyled mt-1">{recipeList}</ul>
    </div>
  );
};

export default Home;
