import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";

import classes from "./BakeryItem.module.css";

const BakeryItem = ({
  value,
  ingredient,
  percentage,
  grams,
  onEdit,
  onDelete,
  className,
}) => {
  const handleFocus = (event) => event.target.select();

  const handleInputChange = (event) => {
    if (parseFloat(event.target.value) < 0) {
      return;
    }
    onEdit(value, event.target.value);
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
      <Card className={className}>
        <h3 className="col-5 fs-6">{ingredient}</h3>
        <div className="col-2 text-success fs-5 d-flex justify-content-center">
          <input
            type="number"
            value={percentage}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            min={0}
            max={100}
            className={classes.inputHover}
          />
        </div>
        <div className="col-3 fs-5  d-flex justify-content-center">{grams}</div>
        <div className="col-2 d-flex justify-content-end">
          <FontAwesomeIcon
            className={classes.iconHover}
            onClick={onDelete}
            icon={faTrashCan}
          />
        </div>
      </Card>
    </li>
  );
};

export default BakeryItem;
