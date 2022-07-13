import React from "react";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../../UI/Card";
import classes from "./CardRecipe.module.css";

const CardRecipe = ({
  title,
  onAction,
  typeIcon,
  className,
  type = "header",
  onTitleChange,
}) => {
  return (
    <Card
      className={className}
      onAction={typeIcon === "home" ? null : onAction}
    >
      {type === "header" ? (
        <h1 className="col fs-5">{title}</h1>
      ) : (
        <input
          className="col fs-5"
          value={title}
          onChange={onTitleChange}
          placeholder="Nombre del Pan"
        />
      )}

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

export default CardRecipe;
