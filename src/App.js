import React from "react";

import Bakery from "./components/Bakery/Bakery";
import Layout from "./components/Layout/Layout";
import BakeryProvider from "./components/store/BakeryProvider";
import CardFormProvider from "./components/store/CardFormProvider";
import IngredientProvider from "./components/store/IngredientProvider";

const App = () => {
  return (
    <CardFormProvider>
      <IngredientProvider>
        <BakeryProvider>
          <Layout>
            <Bakery />
          </Layout>
        </BakeryProvider>
      </IngredientProvider>
    </CardFormProvider>
  );
};

export default App;
