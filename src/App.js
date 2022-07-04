import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Bakery from "./components/Bakery/Bakery";
import Home from "./components/Form/Home";
import Layout from "./components/Layout/Layout";
import BakeryProvider from "./components/store/BakeryProvider";
import CardFormProvider from "./components/store/CardFormProvider";
import IngredientProvider from "./components/store/IngredientProvider";
import RecipeProvider from "./components/store/RecipeProvider";

const App = () => {
  return (
    <CardFormProvider>
      <IngredientProvider>
        <BakeryProvider>
          <RecipeProvider>
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
          </RecipeProvider>
        </BakeryProvider>
      </IngredientProvider>
    </CardFormProvider>
  );
};

export default App;
