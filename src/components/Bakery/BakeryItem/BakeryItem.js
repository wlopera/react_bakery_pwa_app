import React from "react";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";

import classes from "./BakeryItem.module.css";

const BakeryItem = (props) => {
  return (
    <div className=" shadow-lg p-0 mb-1 bg-body rounded">
      <li>
        <Card>
          <div className="row " style={{ height: "30px" }}>
            <h3 className="col-5 fw-bold fs-4">{props.ingredient}</h3>
            <div className="col-2 fw-bold text-success fs-4 d-flex justify-content-center">
              <a href="#" onClick={() => props.onEdit(props.id)}>
                <span className={classes.buttonToLink}>{props.percentage}</span>
              </a>
            </div>
            <div className="col-3 fw-bold fs-4  d-flex justify-content-center">
              {props.grams}
            </div>
            <div className="col-2 fw-bold fs-4 d-flex justify-content-end">
              <FontAwesomeIcon
                className={classes.iconHover}
                onClick={props.onDelete}
                icon={faTrash}
              />
            </div>
          </div>
        </Card>
      </li>
    </div>
  );
};

export default BakeryItem;
