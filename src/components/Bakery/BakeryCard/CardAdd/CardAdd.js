import React from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../../UI/Card";
import classes from "./CardAdd.module.css";

const CardAdd = ({ id, label, className, onModify, onDelete }) => {
  const updateRowHadler = (id, label) => {
    onModify({
      id: id,
      label: label,
    });
  };

  const deleteRowHadler = (id) => {
    onDelete(id);
  };

  return (
    <Card className={className}>
      <div
        className="row d-flex align-items-center"
        style={{
          borderBottom: "2px solid lightgray",
        }}
      >
        <div className="col-8 d-flex justify-content-center">
          <input
            type="text"
            value={label}
            disabled
            style={{
              width: "100%",
              border: "none",
              backgroundColor: "white",
            }}
          />
        </div>
        <div className="col-2 d-flex justify-content-end">
          <FontAwesomeIcon
            className={classes.iconHover}
            onClick={() => updateRowHadler(id, label)}
            icon={faPenToSquare}
          />
        </div>
        <div className="col-2 d-flex justify-content-right">
          <FontAwesomeIcon
            className={classes.iconHover}
            onClick={() => deleteRowHadler(id)}
            icon={faTrashCan}
          />
        </div>
      </div>
    </Card>
  );
};

export default CardAdd;
