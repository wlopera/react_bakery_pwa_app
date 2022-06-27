import React from "react";

import Bakery from "./components/Bakery/Bakery";
import Layout from "./components/Layout/Layout";
import BakeryProvider from "./components/store/BakeryProvider";

const App = () => {
  return (
    <BakeryProvider>
      <Layout>
        <Bakery />
      </Layout>
    </BakeryProvider>
  );
};

export default App;
