import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CardTitle from "../Bakery/BakeryCard/Card/CardTitle";
import CardRecipe from "../Bakery/BakeryCard/CardRecipe/CardRecipe";

import CatalogContext from "../../store/Catalog/catalog-context";

const Home = () => {
  const [dataBasic, setDataBasic] = useState([]);
  const catalogCtx = useContext(CatalogContext);

  let history = useHistory();

  useEffect(() => {
    const data = catalogCtx.recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      order: recipe.order,
    }));

    setDataBasic(data);
  }, [catalogCtx]);

  const handleInit = (id) => {
    history.push("/bakery/" + id);
  };

  const recipeList = dataBasic.map((row) => (
    <div key={row.id}>
      <CardRecipe
        className="row d-flex align-items-center bg-white border-bottom w-100"
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
        className="row d-flex align-items-center bg-primary w-100"
      />
      <ul className="list-unstyled">{recipeList}</ul>
    </div>
  );
};

export default Home;
