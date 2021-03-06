import React, { useState } from "react";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/Card/CardHeader";
import Modal from "../UI/Modal/Modal";

import { useCatalog } from "../../store/catalog-context";
import { useBakery } from "../../store/bakery-context";

import ProcessIngredient from "../Form/ProcessIngredient";
import { addIngredient } from "../util/Utilities";

const BakeryIngredient = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const { ingredients } = useCatalog();
  const { order, data, add, update, remove } = useBakery();
  const { amount, perUnit } = order;

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const addRowHandler = () => {
    setRow({ amount: 0, ingredient: [] });
    toggle();
  };

  const processRowHandler = (record) => {
    const ingredients = record.map((item) => ({
      value: item.value,
      ingredient: item.label,
      percentage: 0,
      grams: 0,
    }));

    addIngredient(ingredients, { amount, perUnit }, add, "ingredient");
    toggle();
  };

  const editRowHadler = (value, label) => {
    const row = data.filter((item) => item.value === value)[0];
    update(
      {
        ...row,
        percentage: label,
      },
      {
        amount,
        perUnit,
      }
    );
  };

  const deleteRowHadler = (value) => {
    remove(value, { amount, perUnit });
  };

  const dataIngredients = data.filter((flour) => flour.type === "ingredient");

  const bakeryList = dataIngredients.map((row) => (
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
            currentData={data}
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
