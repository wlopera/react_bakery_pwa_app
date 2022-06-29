import React, { Fragment, useContext } from "react";

import CardForm from "./BakeryCard/CardForm";
import CardTitle from "./BakeryCard/CardTitle";
import BakeryFlour from "./BakeryFlour";

import CardFormContext from "../store/card-form-context";
import BakeryContext from "../store/bakery-context";
import BakeryIngredient from "./BakeryIngredient";
import BakeryTotal from "./BakeryTotal";

const Bakery = () => {
  const cardFormCtx = useContext(CardFormContext);
  const bakeryCtx = useContext(BakeryContext);

  return (
    <Fragment>
      <CardTitle title="Baguettes" />
      <div className="mb-1"></div>
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
