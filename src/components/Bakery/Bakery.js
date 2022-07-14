import React, { Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import CardForm from "./BakeryCard/CardForm/CardForm";
import BakeryFlour from "./BakeryFlour";

import { useCatalog } from "../../store/catalog-context";
import { useBakery } from "../../store/bakery-context";

import BakeryIngredient from "./BakeryIngredient";
import BakeryTotal from "./BakeryTotal";

import CardRecipe from "../Bakery/BakeryCard/CardRecipe/CardRecipe";
import RecipeService from "../../services/recipe.service";

import { addIngredient, createRecord } from "../util/Utilities";

const Bakery = () => {
  const param = useParams();

  const { id } = param;
  const { recipes } = useCatalog();
  const { order, onOrder, title, setTitle, reset, add, data } = useBakery();
  const { amount, perUnit } = order;

  let recipe = null;
  if (id !== "0" && recipes.length > 0) {
    recipe = recipes.find((row) => row.id === id);
  }

  useEffect(() => {
    if (recipe) {
      // Limpiar la data
      reset();

      // Tipo de pan
      setTitle(recipe.name);

      // Orden
      onOrder(recipe.order.amount, recipe.order.perUnit);

      // Harinas
      addIngredient(recipe.flours, recipe.order, add, "flour");

      // //Otros Ingredientes
      addIngredient(recipe.ingredients, recipe.order, add, "ingredient");
    }
  }, [recipe, reset, setTitle, onOrder, add]);

  let history = useHistory();

  const handleReturn = () => {
    history.push("/home");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleModify = async () => {
    const record = createRecord(title, order, data);

    if (id === "0") {
      const result = await RecipeService.create(record);
      console.log(result.data.message);
    } else {
      const result = await RecipeService.update(id, record);
      console.log(result.data.message);
    }
    history.push("/");
    window.location.reload();
  };

  const handleDelete = async () => {
    const result = await RecipeService.delete(id);
    console.log(result.data.message);
    history.push("/");
    window.location.reload();
  };

  const token = localStorage.getItem("token");
  const buttonTitle = id === "0" ? "Agregar" : "Modificar";
  const total = amount * perUnit;

  return (
    <Fragment>
      <CardRecipe
        className="row d-flex align-items-center bg-primary border-bottom w-100"
        title={title}
        onAction={() => handleReturn()}
        typeIcon="home"
        type={token ? "input" : "header"}
        onTitleChange={token ? handleTitleChange : null}
      />

      <div className="mt-2 mb-2">
        <CardForm />
      </div>
      <div
        style={{
          overflowY: "auto",
          height: "58vh",
          paddingRight: "20px",
        }}
      >
        {total > 0 && (
          <div>
            <BakeryFlour />
            <div>
              <BakeryIngredient />
              <BakeryTotal />
            </div>
          </div>
        )}
        <div className="d-flex justify-content-around mt-2">
          {token && (
            <button
              className="btn btn-sm btn-custom-secondary w-25"
              onClick={handleModify}
            >
              {buttonTitle}
            </button>
          )}
          {token && id !== "0" && (
            <button
              className="btn btn-sm btn-custom-success w-25"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Bakery;
