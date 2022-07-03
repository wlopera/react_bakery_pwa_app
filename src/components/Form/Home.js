import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CardTitle from "../Bakery/BakeryCard/CardTitle";
import CardRecipe from "../Bakery/BakeryCard/CardRecipe";

import RecipeContext from "../store/recipe-context";

const Home = () => {
  const [dataBasic, setDataBasic] = useState([]);
  const recipesCtx = useContext(RecipeContext);
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

  const handleInit = (id) => {
    history.push("/bakery/" + id);
  };

  const recipeList = dataBasic.map((row) => (
    <div key={row.id}>
      <CardRecipe
        className="row d-flex align-items-center bg-white border-bottom w-50"
        title={row.name}
        onAction={() => handleInit(row.id)}
        typeIcon="action"
      />
    </div>
  ));

  return (
    <div>
      <CardTitle
        title="Recetas"
        className="row d-flex align-items-center bg-primary w-50"
      />
      <ul className="list-unstyled">{recipeList}</ul>
    </div>
  );
};

export default Home;
