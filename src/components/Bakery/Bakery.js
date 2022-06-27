import React, { Fragment } from "react";

import CardForm from "./BakeryCard/CardForm";
import CardTitle from "./BakeryCard/CardTitle";
import BakeryFlour from "./BakeryFlour";

const Bakery = () => {
  return (
    <Fragment>
      <CardTitle title="Pan Francés" />
      <br />
      <CardForm />
      <br />
      <BakeryFlour cardTitle="Pan Francés" />
    </Fragment>
  );
};

export default Bakery;
