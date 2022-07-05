import React, { useEffect, useState } from "react";
import CardCheck from "../Bakery/BakeryCard/CardCheck";

const ProcessIngredient = ({
  row,
  onClose,
  processRow,
  currentData,
  combo,
}) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    let newData = [...combo];
    currentData.forEach((item) => {
      newData = newData.filter((register) => register.value !== item.value);
    });

    setIngredients([...newData]);
  }, [row, currentData, combo]);

  const handleCheck = (ingredient) => {
    setSelectedOption((options) => {
      const data = options.filter((item) => item.value === ingredient.value);
      if (data.length > 0) {
        return options.filter((item) => item.value !== ingredient.value);
      } else {
        return [...options, ingredient];
      }
    });
  };

  const checksList = ingredients.map((ingredient) => (
    <CardCheck
      key={ingredient.value}
      title={ingredient.label}
      onAction={() => handleCheck(ingredient)}
      className="d-flex align-items-center bg-white border-bottom w-100"
      checked={false}
    />
  ));

  const submitHandler = (event) => {
    event.preventDefault();
    if (selectedOption.length > 0) {
      processRow(selectedOption);
    }
  };

  return (
    <>
      <h5 className="bg-primary">Agregar Ingredientes</h5>
      <form onSubmit={submitHandler}>
        <div
          style={{
            overflowY: "auto",
            height: `${ingredients.length > 15 ? "58vh" : ""}`,
            paddingRight: "20px",
          }}
        >
          {checksList}
        </div>
        <div className="row justify-content-md-center">
          <button onClick={onClose} className="btn btn-link w-50">
            Cancelar
          </button>
          {selectedOption.length > 0 ? (
            <button type="submit" className="btn btn-link w-50">
              Agregar
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default ProcessIngredient;
