import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import BakeryProvider from "./store/Flour/FlourProvider";
import IngredientProvider from "./store/Ingredient/IngredientProvider";

import { RecipeProvider } from "./store/Recipe/recipe-context";
import { CardFormProvider } from "./store/CardForm/card-form-context";
import { CatalogProvider } from "./store/Catalog/catalog-context";

import { BuildProviderTree } from "./components/util/Utilities";

import Bakery from "./components/Bakery/Bakery";
import Home from "./components/Form/Home";
import AddFlour from "./components/Form/Add/AddFlour";
import AddIngredient from "./components/Form/Add/AddIngredient";

import Layout from "./components/Layout/Layout";
import Login from "./components/Form/Login/Login";
import Logout from "./components/Form/Login/Logout";

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
          <Route path="/addFlour">
            <AddFlour />
          </Route>
          <Route path="/addIngredient">
            <AddIngredient />
          </Route>
          <Route path="/admin">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </Layout>
    </Providers>
  );
};

export default App;
