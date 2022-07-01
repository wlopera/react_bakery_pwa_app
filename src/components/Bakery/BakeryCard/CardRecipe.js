import React from "react";
import { faChevronRight, faH, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";
import classes from "./CardRecipe.module.css";

const CardTitle = ({ title, onAction, typeIcon }) => {
  return (
    <Card>
      <div className="row d-flex align-items-center" style={{ height: 0 }}>
        <h1 className="col fw-bold fs-4">{title}</h1>
      </div>
      {onAction && (
        <div className="col fw-bold d-flex justify-content-end">
          <FontAwesomeIcon
            className={classes.iconHover}
            onClick={onAction}
            icon={typeIcon === "home" ? faHome : faChevronRight}
            size="2x"
          />
        </div>
      )}
    </Card>
  );
};

export default CardTitle;
