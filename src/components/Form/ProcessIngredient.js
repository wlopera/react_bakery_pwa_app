import React, { useEffect, useState } from "react";
import Select from "react-select";
import CardCheck from "../Bakery/BakeryCard/CardCheck";

const ProcessIngredient = ({
  row,
  onClose,
  processRow,
  currentData,
  combo,
}) => {
  const [record, setRecord] = useState(row);
  const [ingredients, setIngredients] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    let newData = [...combo];
    currentData.forEach((item) => {
      newData = newData.filter((register) => register.value !== item.value);
    });

    setIngredients([...newData]);
  }, [row, currentData, combo]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (selectedOption) {
      processRow({
        ingredients: selectedOption,
        amount: parseFloat(record.amount),
      });
    }
  };

  const handleCheck = (id) => {};

  const checksList = ingredients.map((ingredient) => (
    <CardCheck
      key={ingredient.value + 1000}
      title={ingredient.label}
      onAction={handleCheck(ingredient.value)}
      className="d-flex align-items-center bg-white border-bottom w-100"
    />
  ));

  return (
    <>
      <h5 className="bg-primary">Agregar Ingredientes</h5>
      <form onSubmit={submitHandler}>
        <div
          style={{
            overflowY: "auto",
            height: `${ingredients.length > 10 ? "42vh" : ""}`,
            paddingRight: "20px",
          }}
        >
          {checksList}
        </div>
        <div className="row">
          <button onClick={onClose} className="btn btn-link w-50">
            Cancelar
          </button>
          <button type="submit" className="btn btn-link w-50">
            Agregar
          </button>
        </div>
      </form>
    </>
  );
};

export default ProcessIngredient;
