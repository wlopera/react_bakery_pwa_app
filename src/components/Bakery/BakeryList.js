import React, { useState } from "react";

import BakeryItem from "./BakeryItem/BakeryItem";
import flours from "../store/flours.json";
import ingredients from "../store/ingredients.json";
import CardTitle from "./BakeryCard/CardTitle";
import CardHeader from "./BakeryCard/CardHeader";
import bg_bread from "../../assets/bg_bread.png";
import Modal from "../UI/Modal/Modal";
import ProcessIngredient from "../Form/ProcessIngredient";
import {
  newPercetage,
  editPercentage,
  processRecord,
} from "../utilities/Utility";

const BakeryList = () => {
  const [data, setData] = useState([]);
  const [others, setOthers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const addFlourHandler = (type) => {
    setRow(newPercetage);
    toggle();
  };

  const addHandler = (type) => {
    toggle();
  };

  const processRowHandler = (row) => {
    setData((currentData) => processRecord(row, currentData));
    toggle();
  };

  const editFlourHadler = (item) => {
    setRow(editPercentage(item));
    toggle();
  };

  const deleteHadler = (id) => {
    setData((currentData) => currentData.filter((item) => item.id !== id));
  };

  const bakeryList = data.map((record) => (
    <BakeryItem
      id={record.id}
      key={record.id}
      ingredient={record.text}
      percentage={record.percentage}
      grams={record.grams}
      onEdit={() => editFlourHadler(record)}
      onDelete={() => deleteHadler(record.id)}
    />
  ));

  const othersList = others.map((record) => (
    <BakeryItem
      id={record.id}
      key={record.id}
      ingredient={record.text}
      percentage={record.percentage}
      grams={record.grams}
      onDelete={deleteHadler}
    />
  ));

  return (
    <div
      className="d-flex justify-content-center bg-image"
      style={{
        backgroundImage: ` url(${bg_bread})`,
        height: "100vh",
      }}
    >
      <section className="w-100 mt-5">
        <CardTitle title="Pan Francés" />
        <br />

        <CardHeader
          ingredient="Harina"
          percentageTitle="%"
          gramTitle="Gramos"
          onAdd={addFlourHandler}
          type="FLOUR"
        />
        <ul className="list-unstyled mt-3">{bakeryList}</ul>
        <br />

        <CardHeader
          ingredient="Otros Ingredientes"
          percentageTitle="%"
          gramTitle="Gramos"
          onAdd={addHandler}
          type="OTHER"
        />
        <ul className="list-unstyled mt-3">{othersList}</ul>
      </section>
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
    </div>
  );
};

export default BakeryList;
