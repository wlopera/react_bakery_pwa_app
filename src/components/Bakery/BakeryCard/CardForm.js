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
      <div className="row col-row-sm-1 col-row-md-3 d-flex justify-content-between">
        <div className="col-sm col-md-auto">
          <input
            type="number"
            value={amount}
            onChange={amountHandler}
            placeholder="Cantidad"
            className="w-100"
            autoFocus
          />
        </div>
        <div className="col-sm col-md-auto">
          <input
            type="number"
            value={perUnit}
            onChange={perUnitHandler}
            placeholder="Gramos c/u"
            className="w-100"
          />
        </div>
        <div className="col-sm col-md-auto">
          <span htmlFor="perUnit" className=" w-25" style={{ border: "none" }}>
            {total} grs.
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CardForm;
