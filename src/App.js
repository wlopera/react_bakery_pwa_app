import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import BakeryProvider from "./store/Flour/FlourProvider";
import CardFormProvider from "./store/CardForm/CardFormProvider";
import IngredientProvider from "./store/Ingredient/IngredientProvider";
import RecipeProvider from "./store/Recipe/RecipeProvider";
import CatalogProvider from "./store/Catalog/CatalogProvider";

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
