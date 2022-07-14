import React from "react";
import CardHeader from "./BakeryCard/Card/CardHeader";

import { useBakery } from "../../store/bakery-context";

const BakeryTotal = () => {
  const { order, data } = useBakery();

  const gramsTotal = order.amount * order.perUnit;

  const percentages =
    data.length > 0 ? data.map((item) => parseFloat(item.percentage)) : [];

  const percentagesTotal =
    percentages.length > 0
      ? Math.round(percentages.reduce((acc, item) => acc + item, 0) * 100) / 100
      : 0.0;

  return (
    <CardHeader
      percentageTitle={percentagesTotal}
      gramTitle={gramsTotal}
      className="row d-flex align-items-center bg-primary w-100"
    />
  );
};

export default BakeryTotal;
