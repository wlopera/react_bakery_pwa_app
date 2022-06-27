import React, { Fragment, useContext } from "react";

import CardForm from "./BakeryCard/CardForm";
import CardTitle from "./BakeryCard/CardTitle";
import BakeryFlour from "./BakeryFlour";

import CardFormContext from "../store/card-form-context";
import BakeryIngredient from "./BakeryIngredient";

const Bakery = () => {
  const cardFormCtx = useContext(CardFormContext);

  return (
    <Fragment>
      <CardTitle title="Baguettes" />
      <div className="mb-1"></div>
      <CardForm />
      <div className="mb-1"></div>
      {cardFormCtx.total > 0 && (
        <div>
          <BakeryFlour />
          <BakeryIngredient />
        </div>
      )}
    </Fragment>
  );
};

export default Bakery;
