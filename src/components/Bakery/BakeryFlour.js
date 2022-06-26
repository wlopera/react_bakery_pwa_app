import React, { useState } from "react";

import BakeryItem from "./BakeryItem/BakeryItem";
import CardTitle from "./BakeryCard/CardTitle";
import CardHeader from "./BakeryCard/CardHeader";
import Modal from "../UI/Modal/Modal";

import ProcessIngredient from "../Form/ProcessIngredient";

import { newRow, editRow, processRow } from "../utilities/Utility";

const BakeryFlour = ({ cardTitle, combo }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const addRowHandler = () => {
    setRow(newRow("PERCENTAGE"));
    toggle();
  };

  const processRowHandler = (row) => {
    setData((currentData) => processRow(row, currentData));
    toggle();
  };

  const editRowHadler = (item) => {
    setRow(editRow(item, item.percentage, "PERCENTAGE"));
    toggle();
  };

  const deleteRowHadler = (id) => {
    setData((currentData) => currentData.filter((item) => item.id !== id));
  };

  const bakeryList = data.map((record) => (
    <BakeryItem
      id={record.id}
      key={record.id}
      ingredient={record.text}
      percentage={record.percentage}
      grams={record.grams}
      onEdit={() => editRowHadler(record)}
      onDelete={() => deleteRowHadler(record.id)}
    />
  ));

  return (
    <>
      <div>
        <CardHeader
          ingredient="Harina"
          percentageTitle="%"
          gramTitle="Gramos"
          onAdd={addRowHandler}
          type="FLOUR"
        />
        <ul className="list-unstyled mt-3">{bakeryList}</ul>
        <br />
      </div>
      {showModal && (
        <Modal onClose={toggle}>
          <ProcessIngredient
            row={row}
            currentData={data}
            onClose={toggle}
            processRow={processRowHandler}
            combo={combo}
          />
        </Modal>
      )}
    </>
  );
};

export default BakeryFlour;
