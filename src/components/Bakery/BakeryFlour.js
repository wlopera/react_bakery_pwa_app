import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/CardHeader";
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
      const id = uuidv4();
      flourCtx.addFlour({
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
    const row = flourCtx.data.filter((item) => item.id === id)[0];
    flourCtx.updateFlour({
      ...row,
      percentage: value,
    });
  };

  const deleteRowHadler = (id) => {
    flourCtx.removeFlour(id);
  };

  const bakeryList = flourCtx.data.map((row) => (
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
