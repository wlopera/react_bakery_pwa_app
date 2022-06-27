import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ProcessIngredient = ({
  row,
  onClose,
  processRow,
  currentData,
  combo,
}) => {
  const [record, setRecord] = useState(row);
  const [ingredients, setIngredients] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (row.id === -1) {
      let newData = [...combo];
      currentData.forEach((item) => {
        newData = newData.filter((register) => register.value !== item.value);
      });

      setIngredients([
        {
          value: -1,
          text: "Seleccionar",
        },
        ...newData,
      ]);
    } else {
      setIngredients([row]);
    }
  }, [row, currentData, combo]);

  const numberChangeHandler = (e) => {
    setAlert(null);
    setRecord((currentRecord) => ({
      ...currentRecord,
      number: e.target.value,
    }));
  };

  const comboChangeHandler = (event) => {
    const value = parseInt(event.target.value);
    setAlert(null);
    const ingredient = ingredients.filter(
      (ingredient) => ingredient.value === value
    )[0];

    setRecord((currentRecord) => ({
      ...currentRecord,
      value: ingredient.value,
      text: ingredient.text,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (record.value !== -1) {
      if (record.id === -1) {
        processRow({
          ...record,
          id: uuidv4(),
          percentage:
            record.type === "PERCENTAGE"
              ? parseFloat(record.number)
              : parseFloat(0),
          grams:
            record.type === "GRAMS" ? parseFloat(record.number) : parseFloat(0),
        });
      } else {
        processRow({
          ...record,
          percentage:
            record.type === "PERCENTAGE"
              ? parseFloat(record.number)
              : parseFloat(0),
          grams:
            record.type === "GRAMS" ? parseFloat(record.number) : parseFloat(0),
        });
      }
    } else {
      setAlert("Debe seleccionar un ingrediente");
    }
  };

  return (
    <>
      <h3>Agregar Ingredientes</h3>
      {alert && (
        <div class="alert alert-danger" role="alert">
          {alert}
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div className="row row-cols-sm-1 row-cols-md-2">
          <div className="col-sm col-md-10 bg-warning pt-3 pb-3">
            <div className="container">
              <div className="row g-2 align-items-center">
                <div className="col-3">
                  <label className="col-form-label">Ingrediente(s):</label>
                </div>
                <div className="col-9">
                  <select value={record.value} onChange={comboChangeHandler}>
                    {ingredients.map((ingredient) => (
                      <option key={ingredient.value} value={ingredient.value}>
                        {ingredient.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row g-2 align-items-center">
                <div className="col-3">
                  <label className="col-form-label">
                    {record.type === "PERCENTAGE" ? "Porcentaje: " : "Gramos: "}
                  </label>
                </div>
                <div className="col-9">
                  <input
                    type="number"
                    value={record.number}
                    onChange={numberChangeHandler}
                    autoFocus={record.value !== -1}
                    onFocus={(event) => event.target.select()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm col-md-2 bg-primary  ">
            <div className="d-flex flex-column justify-content-center">
              <div className="row p-2">
                <button onClick={onClose} className="btn btn-info ">
                  Cancelar
                </button>
              </div>

              <div className="row p-2">
                <button type="submit" className="btn btn-success">
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProcessIngredient;
