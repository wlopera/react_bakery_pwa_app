import React, { useContext, useState } from "react";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/CardHeader";
import Modal from "../UI/Modal/Modal";

import IngredientContext from "../store/ingredient-context";
import ProcessIngredient from "../Form/ProcessIngredient";

import { newRow, editRow } from "../utilities/Utility";

const BakeryIngredient = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const ingredientCtx = useContext(IngredientContext);

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const addRowHandler = () => {
    setRow(newRow("PERCENTAGE"));
    toggle();
  };

  const processRowHandler = (row) => {
    console.log(122, row);
    const oldData = ingredientCtx.data.filter((item) => item.id === row.id);

    if (oldData.length === 0) {
      ingredientCtx.addIngredient(row);
    } else {
      ingredientCtx.updateIngredient(row);
    }

    toggle();
  };

  const editRowHadler = (item) => {
    setRow(editRow(item, item.percentage, "PERCENTAGE"));
    toggle();
  };

  const deleteRowHadler = (id) => {
    ingredientCtx.removeIngredient(id);
  };

  const bakeryList = ingredientCtx.data.map((row) => (
    <BakeryItem
      id={row.id}
      key={row.id}
      ingredient={row.text}
      percentage={row.percentage}
      grams={row.grams}
      onEdit={() => editRowHadler(row)}
      onDelete={() => deleteRowHadler(row.id)}
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
        />
        <ul className="list-unstyled mt-1">{bakeryList}</ul>
        <br />
      </div>
      {showModal && (
        <Modal onClose={toggle}>
          <ProcessIngredient
            row={row}
            currentData={ingredientCtx.data}
            onClose={toggle}
            processRow={processRowHandler}
            combo={ingredientCtx.ingredients}
          />
        </Modal>
      )}
    </>
  );
};

export default BakeryIngredient;
