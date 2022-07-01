import React from "react";
import Card from "../../UI/Card";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardHeader = ({ ingredient, percentageTitle, gramTitle, onAdd }) => {
  return (
    <Card>
      <div className="row d-flex align-items-start mb-4" style={{ height: 0 }}>
        <h3 className="col-5 fw-bold fs-5">{ingredient}</h3>
        <div className="col-2 fw-bold fs-5 d-flex justify-content-center">
          {percentageTitle}
        </div>
        <div className="col-3 fw-bold fs-5 d-flex justify-content-center">
          {gramTitle}
        </div>
        {onAdd && (
          <div className="col-2 d-flex justify-content-end">
            <button className="btn btn-primary btn-sm" onClick={() => onAdd()}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CardHeader;
