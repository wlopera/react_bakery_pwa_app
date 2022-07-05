import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/CardHeader";
import Modal from "../UI/Modal/Modal";

import RecipeContext from "../store/recipe-context";
import IngredientContext from "../store/ingredient-context";
import ProcessIngredient from "../Form/ProcessIngredient";

const BakeryIngredient = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const recipeCtx = useContext(RecipeContext);
  const ingredientCtx = useContext(IngredientContext);

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const addRowHandler = () => {
    setRow({ amount: 0, ingredient: [] });
    toggle();
  };

  const processRowHandler = (record) => {
    record.forEach((item) => {
      const id = uuidv4();
      ingredientCtx.addIngredient({
        id: id,
        key: id,
        value: item.value,
        ingredient: item.label,
        percentage: 0,
        grams: 0,
      });
    });
    toggle();
  };

  const editRowHadler = (value, id) => {
    const row = ingredientCtx.data.filter((item) => item.id === id)[0];
    ingredientCtx.updateIngredient({
      ...row,
      percentage: value,
    });
  };

  const deleteRowHadler = (id) => {
    ingredientCtx.removeIngredient(id);
  };

  const bakeryList = ingredientCtx.data.map((row) => (
    <BakeryItem
      id={row.id}
      key={row.id}
      ingredient={row.ingredient}
      percentage={row.percentage}
      grams={row.grams}
      onEdit={editRowHadler}
      onDelete={() => deleteRowHadler(row.id)}
      className="row d-flex align-items-center bg-white border-bottom w-100"
    />
  ));

  return (
    <>
      <div>
        <CardHeader
          ingredient="Ingredientes"
          percentageTitle="%"
          gramTitle="Gramos"
          onAdd={addRowHandler}
          className="row d-flex align-items-center bg-primary w-100"
        />
        <ul className="list-unstyled">{bakeryList}</ul>
      </div>
      {showModal && (
        <Modal onClose={toggle}>
          <ProcessIngredient
            row={row}
            currentData={ingredientCtx.data}
            onClose={toggle}
            processRow={processRowHandler}
            combo={recipeCtx.ingredients}
          />
        </Modal>
      )}
    </>
  );
};

export default BakeryIngredient;
