import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/CardHeader";
import Modal from "../UI/Modal/Modal";

import BakeryContext from "../store/bakery-context";
import ProcessIngredient from "../Form/ProcessIngredient";

const BakeryFlour = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const bakeryCtx = useContext(BakeryContext);

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const addRowHandler = () => {
    setRow({ amount: 0, ingredient: [] });
    toggle();
  };

  const processRowHandler = (record) => {
    record.ingredients.forEach((item) => {
      const id = uuidv4();
      bakeryCtx.addFlour({
        id: id,
        key: id,
        value: item.value,
        ingredient: item.label,
        percentage: record.amount,
        grams: 0,
      });
    });

    toggle();
  };

  const editRowHadler = (value, id) => {
    const row = bakeryCtx.data.filter((item) => item.id === id)[0];
    bakeryCtx.updateFlour({
      ...row,
      percentage: value,
    });
  };

  const deleteRowHadler = (id) => {
    bakeryCtx.removeFlour(id);
  };

  const bakeryList = bakeryCtx.data.map((row) => (
    <BakeryItem
      id={row.id}
      key={row.id}
      ingredient={row.ingredient}
      percentage={row.percentage}
      grams={row.grams}
      onEdit={editRowHadler}
      onDelete={() => deleteRowHadler(row.id)}
    />
  ));

  let alert = null;
  if (bakeryCtx.data.length > 0 && bakeryCtx.percentages !== 100) {
    alert = "La harina total debe ser 100%";
  }

  return (
    <>
      <div>
        {alert && (
          <div className="alert alert-danger mb-1" role="alert">
            {alert}
          </div>
        )}
        <CardHeader
          ingredient="Harinas"
          percentageTitle={`${bakeryCtx.percentages} %`}
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
            currentData={bakeryCtx.data}
            onClose={toggle}
            processRow={processRowHandler}
            combo={bakeryCtx.flours}
          />
        </Modal>
      )}
    </>
  );
};

export default BakeryFlour;
