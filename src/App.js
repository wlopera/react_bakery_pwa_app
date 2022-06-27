import React from "react";

import Bakery from "./components/Bakery/Bakery";
import Layout from "./components/Layout/Layout";
import BakeryProvider from "./components/store/BakeryProvider";
import CardFormProvider from "./components/store/CardFormProvider";

const App = () => {
  return (
    <CardFormProvider>
      <BakeryProvider>
        <Layout>
          <Bakery />
        </Layout>
      </BakeryProvider>
    </CardFormProvider>
  );
};

export default App;
