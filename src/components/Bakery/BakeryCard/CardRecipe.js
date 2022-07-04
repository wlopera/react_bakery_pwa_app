import React from "react";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";
import classes from "./CardRecipe.module.css";

const CardTitle = ({ title, onAction, typeIcon, className }) => {
  return (
    <Card className={className} onAction={onAction}>
      <h1 className="col fs-5">{title}</h1>

      {onAction && (
        <div className="col d-flex justify-content-end">
          <FontAwesomeIcon
            className={classes.iconHover}
            onClick={onAction}
            icon={typeIcon === "home" ? faHome : faChevronRight}
          />
        </div>
      )}
    </Card>
  );
};

export default CardTitle;
