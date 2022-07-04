import React from "react";
import Card from "../../UI/Card";

const CardCheck = ({ title, onAction, className }) => {
  return (
    <Card className={className} onAction={onAction}>
      <h1 className="col-10 fs-6">{title}</h1>
      <div className="col-2 d-flex justify-content-end">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
      </div>
    </Card>
  );
};

export default CardCheck;
