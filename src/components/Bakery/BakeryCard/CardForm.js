import React, { useContext } from "react";

import Card from "../../UI/Card";
import CardFormContext from "../../store/card-form-context";

const CardForm = () => {
  const cardFormCtx = useContext(CardFormContext);

  const amountHandler = (event) => {
    cardFormCtx.onAmount(event.target.value);
  };

  const perUnitHandler = (event) => {
    cardFormCtx.onPerUnit(event.target.value);
  };

  const { amount, perUnit, total } = cardFormCtx;

  return (
    <Card>
      <div className="row col-row-sm-1 col-row-md-3">
        <div className="col-sm col-md-auto input-group-lg">
          <input
            type="number"
            value={amount}
            onChange={amountHandler}
            placeholder="Cantidad"
            className="form-control"
            autoFocus
          />
        </div>
        <div className="col-sm col-md-auto input-group-lg">
          <input
            type="number"
            value={perUnit}
            onChange={perUnitHandler}
            placeholder="Gramos c/u"
            className="form-control"
          />
        </div>
        <div className="col-sm col-md-auto input-group-lg">
          <span htmlFor="perUnit" className="form-control">
            {total} grs.
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CardForm;
