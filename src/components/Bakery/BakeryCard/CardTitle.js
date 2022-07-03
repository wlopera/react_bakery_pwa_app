import React from "react";
import Card from "../../UI/Card";

const CardTitle = ({ title, className }) => {
  return (
    <Card className={className}>
      <h1 className="col fw-bold fs-3">{title}</h1>
    </Card>
  );
};

export default CardTitle;
