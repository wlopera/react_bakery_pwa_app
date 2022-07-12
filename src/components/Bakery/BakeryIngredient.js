import React, { useContext, useState } from "react";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/Card/CardHeader";
import Modal from "../UI/Modal/Modal";

import { useCatalog } from "../../store/Catalog/catalog-context";

import IngredientContext from "../../store/Ingredient/ingredient-context";
import ProcessIngredient from "../Form/ProcessIngredient";

const BakeryIngredient = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const { ingredients } = useCatalog();

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
      ingredientCtx.addIngredient({
        value: item.value,
        ingredient: item.label,
        percentage: 0,
        grams: 0,
      });
    });
    toggle();
  };

  const editRowHadler = (value, label) => {
    const row = ingredientCtx.data.filter((item) => item.value === value)[0];
    ingredientCtx.updateIngredient({
      ...row,
      percentage: label,
    });
  };

  const deleteRowHadler = (value) => {
    ingredientCtx.removeIngredient(value);
  };

  const bakeryList = ingredientCtx.data.map((row) => (
    <BakeryItem
      key={row.value}
      value={row.value}
      ingredient={row.ingredient}
      percentage={row.percentage}
      grams={row.grams}
      onEdit={editRowHadler}
      onDelete={() => deleteRowHadler(row.value)}
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
            combo={ingredients}
          />
        </Modal>
      )}
    </>
  );
};

export default BakeryIngredient;
