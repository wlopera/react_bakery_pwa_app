import React from "react";
import Card from "../../UI/Card";

const CardTitle = ({ title }) => {
  return (
    <Card>
      <div className="row d-flex align-items-center">
        <h1 className="col fw-bold fs-1">{title}</h1>
      </div>
    </Card>
  );
};

export default CardTitle;
