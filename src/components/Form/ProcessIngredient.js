import React, { useEffect, useState } from "react";
import Select from "react-select";

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

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      submitHandler(event);
    }
  };

  useEffect(() => {
    let newData = [...combo];
    currentData.forEach((item) => {
      newData = newData.filter((register) => register.value !== item.value);
    });

    setIngredients([...newData]);
  }, [row, currentData, combo]);

  const amountChangeHandler = (e) => {
    setRecord((currentRecord) => ({
      ...currentRecord,
      amount: e.target.value,
    }));
  };

  const comboChangeHandler = (options) => {
    setSelectedOption(options);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (selectedOption) {
      processRow({
        ingredients: selectedOption,
        amount: parseFloat(record.amount),
      });
    }
  };

  const handleFocus = (event) => event.target.select();

  return (
    <>
      <h3>Agregar Ingredientes</h3>
      <form onSubmit={submitHandler}>
        <div className="row row-cols-sm-1 row-cols-md-2">
          <div className="col-sm col-md-10 bg-warning pt-3 pb-3">
            <div className="container">
              <div className="row g-2 align-items-center">
                <div className="col-3">
                  <label className="col-form-label">Porcentaje:</label>
                </div>
                <div className="col-9">
                  <input
                    type="number"
                    value={record.amount}
                    onChange={amountChangeHandler}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                  />
                </div>
              </div>

              <div className="row g-2 align-items-center">
                <div className="col-3">
                  <label className="col-form-label">Ingrediente(s):</label>
                </div>
                <div className="col-9">
                  <Select
                    defaultValue={selectedOption}
                    onChange={comboChangeHandler}
                    options={ingredients}
                    isMulti
                    closeMenuOnSelect={false}
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
