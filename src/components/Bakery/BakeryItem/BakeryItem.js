import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";

import classes from "./BakeryItem.module.css";

const BakeryItem = (props) => {
  const handleFocus = (event) => event.target.select();

  const handleInputChange = (event, id) => {
    if (parseFloat(event.target.value) < 0) {
      return;
    }
    props.onEdit(event.target.value, props.id);
  };

  const handleKeyDown = (event) => {
    //console.log("Caracter keyCode:", event.keyCode);
    if (
      event.keyCode === 109 ||
      event.keyCode === 189 ||
      event.keyCode === 107 ||
      event.keyCode === 187
    ) {
      event.preventDefault();
    }
  };

  return (
    <li>
      <Card className={props.className}>
        <h3 className="col-5 fw-bold fs-5">{props.ingredient}</h3>
        <div className="col-2 fw-bold text-success fs-5 d-flex justify-content-center">
          <input
            type="number"
            value={props.percentage}
            onChange={(event) => handleInputChange(event, props.id)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            min={0}
            max={100}
            className={classes.inputHover}
          />
        </div>
        <div className="col-3 fw-bold fs-5  d-flex justify-content-center">
          {props.grams}
        </div>
        <div className="col-2 fw-bold d-flex justify-content-end">
          <FontAwesomeIcon
            className={classes.iconHover}
            onClick={props.onDelete}
            icon={faTrashCan}
          />
        </div>
      </Card>
    </li>
  );
};

export default BakeryItem;
