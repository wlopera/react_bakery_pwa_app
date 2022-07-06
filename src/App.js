import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import BakeryProvider from "./components/store/BakeryProvider";
import CardFormProvider from "./components/store/CardFormProvider";
import IngredientProvider from "./components/store/IngredientProvider";
import RecipeProvider from "./components/store/RecipeProvider";
import CatalogProvider from "./components/store/CatalogProvider";

import { BuildProviderTree } from "./components/util/Utilities";

import Bakery from "./components/Bakery/Bakery";
import Home from "./components/Form/Home";
import Layout from "./components/Layout/Layout";

const App = () => {
  const Providers = BuildProviderTree([
    CardFormProvider,
    IngredientProvider,
    BakeryProvider,
    RecipeProvider,
    CatalogProvider,
  ]);

  return (
    <Providers>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/bakery/:id">
            <Bakery />
          </Route>
        </Switch>
      </Layout>
    </Providers>
  );
};

export default App;
