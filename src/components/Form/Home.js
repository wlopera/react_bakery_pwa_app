import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import CardTitle from "../Bakery/BakeryCard/Card/CardTitle";
import CardRecipe from "../Bakery/BakeryCard/CardRecipe/CardRecipe";

import { useCatalog } from "../../store/catalog-context";
import { useRecipe } from "../../store/recipe-context";
import { useFlour } from "../../store/flour-context";
import { useIngredient } from "../../store/ingredient-context";

const Home = () => {
  const { dataBasic, addDataBasic } = useRecipe();
  const { recipes } = useCatalog();
  const { resetFlour } = useFlour();
  const { resetIngredient } = useIngredient();

  let history = useHistory();

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

  return (
    <div>
      <CardTitle
        title="Recetas"
        className="row d-flex align-items-center bg-primary w-100"
      />
      <ul className="list-unstyled">{recipeList}</ul>
    </div>
  );
};

export default Home;
