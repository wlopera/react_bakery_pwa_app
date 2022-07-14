import React, { useState } from "react";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/Card/CardHeader";
import Modal from "../UI/Modal/Modal";

import { useCatalog } from "../../store/catalog-context";
import { useBakery } from "../../store/bakery-context";

import ProcessIngredient from "../Form/ProcessIngredient";
import { addIngredient } from "../util/Utilities";

const BakeryFlour = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const { flours } = useCatalog();
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
    addIngredient(record, { amount, perUnit }, add, "flour");
    toggle();
  };

  const editRowHadler = (value, label) => {
    const row = data.filter((item) => item.value === value)[0];
    update(
      {
        ...row,
        percentage: parseFloat(label),
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

  const dataFlours = data.filter((flour) => flour.type === "flour");

  const bakeryList = dataFlours.map((row) => (
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

  let alert = null;

  const percentagesList =
    dataFlours.length > 0
      ? dataFlours.map((item) => parseFloat(item.percentage))
      : [];

  const percentages = percentagesList.reduce((acc, item) => acc + item, 0);

  if (percentages !== 100) {
    alert = "La harina total debe ser 100%";
  }

  return (
    <>
      <div>
        {alert && (
          <div
            className="alert alert-danger mb-1 me-4  d-flex align-items-center"
            style={{ height: 0 }}
          >
            {alert}
          </div>
        )}
        <CardHeader
          ingredient="Harinas"
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
            combo={flours}
          />
        </Modal>
      )}
    </>
  );
};

export default BakeryFlour;
