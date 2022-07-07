import React, { useContext, useEffect } from "react";

import CatalogContext from "../../store/Catalog/catalog-context";
import FlourService from "../../services/flour.service";
import IngredientService from "../../services/ingredient.service";
import RecipeService from "../../services/recipe.service";
import Navigation from "./Navigation";

const Layout = (props) => {
  //Carga de catalogos
  const catalogCtx = useContext(CatalogContext);

  const { setCatalogs } = catalogCtx;

  useEffect(() => {
    const getCatalogContext = async () => {
      // Consultar combo de harinas en BD
      const flours = await FlourService.get().then((res) => {
        return res.data.body.map((item) => ({
          value: item._id,
          label: item.label,
        }));
      });

      // Consultar combo de ingredientes en BD
      const ingredients = await IngredientService.get().then((res) => {
        return res.data.body.map((item) => ({
          value: item._id,
          label: item.label,
        }));
      });

      // Consultar combo de ingredientes en BD
      const recipes = await RecipeService.get().then((res) => {
        return res.data.body.map((item) => ({
          ...item,
          id: item._id,
        }));
      });

      setCatalogs({
        flours: flours,
        ingredients: ingredients,
        recipes: recipes,
      });
    };

    getCatalogContext();
  }, [setCatalogs]);

  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center bg-image"
        style={{
          right: 0,
          top: 0,
          zIndex: -100,
        }}
      >
        <Navigation />
        <section className="container w-100 mt-2 me-auto">
          {props.children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
