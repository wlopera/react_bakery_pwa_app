import React, { useState } from "react";
import Card from "../../UI/Card";

const CardForm = () => {
  const [amount, setAmount] = useState(0);
  const [perUnit, setPerUnit] = useState(0);
  const [total, setTotal] = useState(0);

  const amountHandler = (event) => {
    setAmount(event.target.value);
    setTotal(event.target.value * perUnit);
  };

  const perUnitHandler = (event) => {
    setPerUnit(event.target.value);
    setTotal(event.target.value * amount);
  };

  return (
    <Card>
      <div className="row  col-row-sm-1 col-row-md-3">
        <div className="col-sm col-md-auto">
          <input
            type="number"
            value={amount}
            onChange={amountHandler}
            placeholder="Cantidad"
            className="form-control"
          />
        </div>
        <div className="col-sm col-md-auto">
          <input
            type="number"
            value={perUnit}
            onChange={perUnitHandler}
            placeholder="Gramos c/u"
            className="form-control"
          />
        </div>
        <div className="col-sm col-md-auto">
          <span htmlFor="perUnit" className="form-control">
            {total} grs.
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CardForm;
