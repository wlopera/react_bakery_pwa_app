import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";
import classes from "./CardRecipe.module.css";

const CardTitle = ({ title, onInit }) => {
  return (
    <Card>
      <div className="row d-flex align-items-center" style={{ height: 0 }}>
        <h1 className="col fw-bold fs-4">{title}</h1>
      </div>
      {onInit && (
        <div className="col fw-bold d-flex justify-content-end">
          <FontAwesomeIcon
            className={classes.iconHover}
            onClick={onInit}
            icon={faChevronRight}
            size="2x"
          />
        </div>
      )}
    </Card>
  );
};

export default CardTitle;
