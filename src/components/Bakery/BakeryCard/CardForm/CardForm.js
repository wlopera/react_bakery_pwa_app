import React from "react";

import Card from "../../../UI/Card";
import { useBakery } from "../../../../store/bakery-context";

import classes from "./CardForm.module.css";

const CardForm = () => {
  const { order, onOrder } = useBakery();
  const { amount, perUnit } = order;

  const handleKeyDown = (event) => {
    // console.log("Caracter keyCode:", event.keyCode, event.charCode);
    if (
      event.keyCode === 109 ||
      event.keyCode === 189 ||
      event.keyCode === 107 ||
      event.keyCode === 187
    ) {
      event.preventDefault();
    }
  };

  const handleFocus = (event) => event.target.select();

  const amountHandler = (event) => {
    const value =
      event.target.value.trim().length > 0
        ? parseFloat(event.target.value)
        : "";
    onOrder(value, perUnit);
  };

  const perUnitHandler = (event) => {
    const value =
      event.target.value.trim().length > 0
        ? parseFloat(event.target.value)
        : "";
    onOrder(amount, value);
  };

  const total = !isNaN(amount) && !isNaN(perUnit) ? amount * perUnit : 0;

  return (
    <Card className="row d-flex justify-content-between w-100">
      <div className="col-3">
        <input
          type="number"
          value={amount}
          onChange={amountHandler}
          placeholder="Cantidad"
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          min={0}
          max={10000}
          className={classes.inputHover}
        />
      </div>
      <div className="col-3">
        <input
          type="number"
          value={perUnit}
          onChange={perUnitHandler}
          placeholder="Gramos c/u"
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          min={0}
          max={10000}
          className={classes.inputHover}
        />
      </div>
      <div className="col-6">
        <span
          htmlFor="perUnit"
          className="fs-5 w-25"
          style={{ border: "none" }}
        >
          {total} grs.
        </span>
      </div>
    </Card>
  );
};

export default CardForm;
