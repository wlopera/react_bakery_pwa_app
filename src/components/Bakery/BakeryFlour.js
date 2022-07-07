import React, { useContext, useState } from "react";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/Card/CardHeader";
import Modal from "../UI/Modal/Modal";

import CatalogContext from "../../store/Catalog/catalog-context";
import FlourContext from "../../store/Flour/flour-context";
import ProcessIngredient from "../Form/ProcessIngredient";

const BakeryFlour = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const catalogCtx = useContext(CatalogContext);
  const flourCtx = useContext(FlourContext);

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const addRowHandler = () => {
    setRow({ amount: 0, ingredient: [] });
    toggle();
  };

  const processRowHandler = (record) => {
    record.forEach((item) => {
      flourCtx.addFlour({
        value: item.value,
        ingredient: item.label,
        percentage: 0,
        grams: 0,
      });
    });

    toggle();
  };

  const editRowHadler = (value, label) => {
    const row = flourCtx.data.filter((item) => item.value === value)[0];
    flourCtx.updateFlour({
      ...row,
      percentage: label,
    });
  };

  const deleteRowHadler = (value) => {
    flourCtx.removeFlour(value);
  };

  const bakeryList = flourCtx.data.map((row) => (
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
  if (flourCtx.percentages !== 100) {
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
            currentData={flourCtx.data}
            onClose={toggle}
            processRow={processRowHandler}
            combo={catalogCtx.flours}
          />
        </Modal>
      )}
    </>
  );
};

export default BakeryFlour;
