import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";

import classes from "./BakeryItem.module.css";

const BakeryItem = (props) => {
  return (
    <div className=" shadow-lg p-0 mb-1 bg-body rounded">
      <li>
        <Card>
          <div
            className="row d-flex align-items-start mb-4"
            style={{ height: 0 }}
          >
            <h3 className="col-5 fw-bold fs-5">{props.ingredient}</h3>
            <div className="col-2 fw-bold text-success fs-5 d-flex justify-content-center">
              <a href="#" onClick={() => props.onEdit(props.id)}>
                <span className={classes.buttonToLink}>{props.percentage}</span>
              </a>
            </div>
            <div className="col-3 fw-bold fs-5  d-flex justify-content-center">
              {props.grams}
            </div>
            <div className="col-2 fw-bold d-flex justify-content-end">
              <FontAwesomeIcon
                className={classes.iconHover}
                onClick={props.onDelete}
                icon={faTrashCan}
                size="2x"
              />
            </div>
          </div>
        </Card>
      </li>
    </div>
  );
};

export default BakeryItem;
