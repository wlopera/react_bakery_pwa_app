import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BakeryItem from "./BakeryItem/BakeryItem";

import flours from "../store/flours.json";
import ingredients from "../store/ingredients.json";
import Card from "../UI/Card";

import bg_bread from "../../assets/bg_bread.png";

const BakeryList = () => {
  const [data, setData] = useState([]);
  const [others, setOthers] = useState([]);

  useEffect(() => {
    const newData = flours.map((flour) => ({
      key: flour.key,
      id: uuidv4(),
      ingredient: flour.text,
      percentage: 100,
      grams: 1650.5,
    }));
    setData(newData);

    const newOthers = ingredients.map((ingredient) => ({
      key: ingredient.key,
      id: uuidv4(),
      ingredient: ingredient.text,
      percentage: 25,
      grams: 156.5,
    }));
    setOthers(newOthers);
  }, []);

  const addHandler = () => {
    setData((currentData) => {
      const newData = [
        ...currentData,
        {
          id: uuidv4(),
          key: 1,
          ingredient: "Ingrediente",
          percentage: 75,
          grams: 135,
        },
      ];

      return newData;
    });
  };

  const editHadler = (id) => {
    console.log("MODIFICAR INGREDIENTE");
  };

  const deleteHadler = (id) => {
    console.log("BORRAR INGREDIENTE: ", id);
    setData((currentData) => currentData.filter((item) => item.id !== id));
  };

  const bakeryList = data.map((record) => (
    <BakeryItem
      id={record.id}
      key={record.id}
      ingredient={record.ingredient}
      percentage={record.percentage}
      grams={record.grams}
      onEdit={editHadler}
      onDelete={deleteHadler}
    />
  ));

  const othersList = others.map((record) => (
    <BakeryItem
      id={record.id}
      key={record.id}
      ingredient={record.ingredient}
      percentage={record.percentage}
      grams={record.grams}
      onEdit={editHadler}
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
        <Card>
          <div className="row d-flex align-items-center">
            <h1 className="col fw-bold fs-1">Pan Francés</h1>
          </div>
        </Card>
        <br />
        <Card>
          <div className="row d-flex align-items-center">
            <h3 className="col-5 fw-bold fs-4">Harina</h3>
            <div className="col-2 fw-bold fs-4 d-flex justify-content-center">
              %
            </div>
            <div className="col-3 fw-bold fs-4  d-flex justify-content-center">
              Gramos
            </div>
            <div className="col-2 d-flex justify-content-end">
              <button className="btn btn-primary btn-lg" onClick={addHandler}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </Card>

        <ul className="list-unstyled mt-3">{bakeryList}</ul>

        <br />
        <Card>
          <div className="row d-flex align-items-center">
            <h3 className="col-5 fw-bold fs-4">Otros Ingredientes</h3>
            <div className="col-2 fw-bold fs-4 d-flex justify-content-center">
              %
            </div>
            <div className="col-3 fw-bold fs-4  d-flex justify-content-center">
              Gramos
            </div>
            <div className="col-2 d-flex justify-content-end">
              <button className="btn btn-primary btn-lg" onClick={addHandler}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </Card>

        <ul className="list-unstyled mt-3">{othersList}</ul>
      </section>
    </div>
  );
};

export default BakeryList;
