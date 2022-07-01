import React, { useContext, useEffect, useState } from "react";

import CardTitle from "../Bakery/BakeryCard/CardTitle";
import CardRecipe from "../Bakery/BakeryCard/CardRecipe";
import RecipeContext from "../store/recipe-context";

const Home = () => {
  const [dataBasic, setDataBasic] = useState([]);
  const recipesCtx = useContext(RecipeContext);

  useEffect(() => {
    const data = recipesCtx.recipesBasic.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      flours: recipe.flours,
      ingredients: recipe.ingredients,
    }));

    setDataBasic(data);
  }, []);

  const handleInit = (e) => {
    console.log("iniittttttttttttttttttttt ", e.target.value);
  };

  console.log(dataBasic);
  const recipeList = dataBasic.map((row) => (
    <div key={row.id}>
      <CardRecipe title={row.name} onInit={handleInit} />
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
