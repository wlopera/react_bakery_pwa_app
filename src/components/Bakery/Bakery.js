import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CardForm from "./BakeryCard/CardForm";
import BakeryFlour from "./BakeryFlour";

import CardFormContext from "../store/card-form-context";
import BakeryContext from "../store/bakery-context";
import RecipeContext from "../store/recipe-context";

import BakeryIngredient from "./BakeryIngredient";
import BakeryTotal from "./BakeryTotal";

import CardRecipe from "../Bakery/BakeryCard/CardRecipe";

const Bakery = () => {
  const [data, setData] = useState(null);
  const cardFormCtx = useContext(CardFormContext);
  const bakeryCtx = useContext(BakeryContext);
  const recipeContext = useContext(RecipeContext);

  useEffect(() => {
    setData(bakeryCtx);
  }, [bakeryCtx]);

  let history = useHistory();

  const handleReturn = () => {
    history.push("/home");
  };

  return (
    <Fragment>
      <CardRecipe
        title={bakeryCtx.title}
        onAction={() => handleReturn()}
        typeIcon="home"
      />
      <div className="mb-2"></div>
      <CardForm />
      <div className="mb-1"></div>
      {cardFormCtx.total > 0 && (
        <div>
          <BakeryFlour />
          {bakeryCtx.percentages === 100 && (
            <div>
              <BakeryIngredient />
              <BakeryTotal />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Bakery;
