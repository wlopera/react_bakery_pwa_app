import React, { useContext, useState } from "react";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardHeader from "./BakeryCard/CardHeader";
import Modal from "../UI/Modal/Modal";

import BakeryContext from "../store/bakery-context";
import ProcessIngredient from "../Form/ProcessIngredient";

import { newRow, editRow } from "../utilities/Utility";

const BakeryFlour = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const bakeryCtx = useContext(BakeryContext);

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const addRowHandler = () => {
    setRow(newRow("PERCENTAGE"));
    toggle();
  };

  const processRowHandler = (row) => {
    const oldData = bakeryCtx.dataFours.filter((item) => item.id === row.id);

    if (oldData.length === 0) {
      bakeryCtx.addRowFlour(row);
    } else {
      bakeryCtx.updateRowFlour(row);
    }

    toggle();
  };

  const editRowHadler = (item) => {
    setRow(editRow(item, item.percentage, "PERCENTAGE"));
    toggle();
  };

  const deleteRowHadler = (id) => {
    bakeryCtx.removeRowFlour(id);
  };

  const bakeryList = bakeryCtx.dataFours.map((row) => (
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

  let alert = null;
  if (bakeryCtx.dataFours.length > 0 && bakeryCtx.percentageFlour !== 100) {
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
          ingredient="Harina"
          percentageTitle={`${bakeryCtx.percentageFlour} %`}
          gramTitle="Gramos"
          onAdd={addRowHandler}
          type="FLOUR"
        />
        <ul className="list-unstyled mt-1">{bakeryList}</ul>
        <br />
      </div>
      {showModal && (
        <Modal onClose={toggle}>
          <ProcessIngredient
            row={row}
            currentData={bakeryCtx.dataFours}
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
