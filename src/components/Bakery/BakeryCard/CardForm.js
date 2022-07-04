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
    <Card className="row d-flex justify-content-between w-50">
      <div className="col-3">
        <input
          type="number"
          value={amount}
          onChange={amountHandler}
          placeholder="Cantidad"
          className=""
          autoFocus
        />
      </div>
      <div className=" col-3">
        <input
          type="number"
          value={perUnit}
          onChange={perUnitHandler}
          placeholder="Gramos c/u"
          className=""
        />
      </div>
      <div className="col-3">
        <span htmlFor="perUnit" className=" w-25" style={{ border: "none" }}>
          {total} grs.
        </span>
      </div>
    </Card>
  );
};

export default CardForm;
