import React from "react";
import Card from "../../UI/Card";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardHeader = ({
  ingredient,
  percentageTitle,
  gramTitle,
  onAdd,
  className,
}) => {
  return (
    <Card className={className}>
      <h5 className="col-5">{ingredient}</h5>
      <div className="col-2 fs-5 d-flex justify-content-center">
        {percentageTitle}
      </div>
      <div className="col-3 fs-5 d-flex justify-content-center">
        {gramTitle}
      </div>
      {onAdd && (
        <div className="col-2 d-flex justify-content-end">
          <button className="btn btn-primary btn-sm" onClick={() => onAdd()}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      )}
    </Card>
  );
};

export default CardHeader;
