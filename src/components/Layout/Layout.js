import React, { useContext, useEffect } from "react";

import CatalogContext from "../../store/Catalog/catalog-context";
import FlourService from "../../services/flour.service";
import IngredientService from "../../services/ingredient.service";

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

      setCatalogs({
        flours: flours,
        ingredients: ingredients,
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
        <section className="container w-100 mt-2 me-auto">
          {props.children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
