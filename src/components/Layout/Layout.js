import React from "react";

import flours from "../store/flours.json";

import bg_bread from "../../assets/bg_bread.png";
import BakeryFlour from "../Bakery/BakeryFlour";
import CardForm from "../Bakery/BakeryCard/CardForm";
import CardTitle from "../Bakery/BakeryCard/CardTitle";

const Layout = () => {
  return (
    <div
      className=" d-flex justify-content-center bg-image"
      style={{
        backgroundImage: ` url(${bg_bread})`,
        height: "100vh",
      }}
    >
      <section className=" container w-100 mt-2">
        <CardTitle title="Pan Francés" />
        <br />
        <CardForm />
        <br />
        <BakeryFlour cardTitle="Pan Francés" combo={flours} />
      </section>
    </div>
  );
};

export default Layout;
