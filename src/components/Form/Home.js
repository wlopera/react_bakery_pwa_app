import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import CardTitle from "../Bakery/BakeryCard/Card/CardTitle";
import CardRecipe from "../Bakery/BakeryCard/CardRecipe/CardRecipe";

import { useCatalog } from "../../store/catalog-context";
import { useRecipe } from "../../store/recipe-context";
import { useCardForm } from "../../store/card-form-context";
import { useFlour } from "../../store/flour-context";
import { useIngredient } from "../../store/ingredient-context";
import CardHeader from "../Bakery/BakeryCard/Card/CardHeader";

const Home = () => {
  const { dataBasic, addDataBasic } = useRecipe();
  const { recipes } = useCatalog();
  const { onAmount, onPerUnit } = useCardForm();
  const { setTitle, resetFlour } = useFlour();
  const { resetIngredient } = useIngredient();

  let history = useHistory();

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Limpiar la data
    resetFlour();
    resetIngredient();

    const data = recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      order: recipe.order,
    }));

    addDataBasic(data);
  }, [recipes, addDataBasic, resetFlour, resetIngredient]);

  const handleInit = (id) => {
    if (id === 0) {
      resetFlour();
      resetIngredient();
      setTitle("");
      onAmount(0);
      onPerUnit(0);
    } else {
      if (recipes.length > 0) {
        const recipe = recipes.find((row) => row.id === id);
        onAmount(recipe.order.amount);
        onPerUnit(recipe.order.perUnit);
      }
    }
    history.push("/bakery/" + id);
  };

  const recipeList = dataBasic.map((row) => (
    <CardRecipe
      className="row d-flex align-items-center bg-white border-bottom w-100"
      title={row.name}
      onAction={() => handleInit(row.id)}
      typeIcon="action"
      key={row.id}
    />
  ));

  const addRowHandler = () => {
    // Agregar nueva receta
    handleInit(0);
  };

  const context = token ? (
    <CardHeader
      ingredient="Recetas"
      onAdd={addRowHandler}
      className="row d-flex align-items-center bg-primary w-100"
    />
  ) : (
    <CardTitle
      title="Recetas"
      className="row d-flex align-items-center bg-primary w-100"
    />
  );

  return (
    <div>
      {context}
      <ul className="list-unstyled">{recipeList}</ul>
    </div>
  );
};

export default Home;
