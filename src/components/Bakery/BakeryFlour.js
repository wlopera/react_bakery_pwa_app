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
    const oldData = bakeryCtx.data.filter((item) => item.id === row.id);

    if (oldData.length === 0) {
      bakeryCtx.addFlour(row);
    } else {
      bakeryCtx.updateFlour(row);
    }

    toggle();
  };

  const editRowHadler = (item) => {
    setRow(editRow(item, item.percentage, "PERCENTAGE"));
    toggle();
  };

  const deleteRowHadler = (id) => {
    bakeryCtx.removeFlour(id);
  };

  const bakeryList = bakeryCtx.data.map((row) => (
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
