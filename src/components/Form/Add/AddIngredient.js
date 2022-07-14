import React, { useState } from "react";

import { useCatalog } from "../../../store/catalog-context";
import CardAdd from "../../Bakery/BakeryCard/CardAdd/CardAdd";
import service from "../../../services/ingredient.service";
import CardHeader from "../../Bakery/BakeryCard/Card/CardHeader";
import Modal from "../../UI/Modal/Modal";

const AddIngredient = () => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(null);

  const { setCatalogs, ingredients, flours } = useCatalog();

  const toggle = () => {
    setShowModal((currentValue) => !currentValue);
  };

  const handleInputChange = (event) => {
    setRow((currentRow) => ({
      id: currentRow.id,
      label: event.target.value,
    }));
  };

  const handleModify = (record) => {
    toggle();
    setRow(record);
  };

  const handleDelete = async (id) => {
    setRow(null);
    const res = await service.delete(id);
    updateCatalogs(res.status);
  };

  const handleProcess = async () => {
    if (row.id === 0) {
      const res = await service.create({
        label: row.label,
      });
      updateCatalogs(res.status);
    } else {
      const res = await service.update(row.id, {
        label: row.label,
      });
      updateCatalogs(res.status);
    }
    setRow(null);
  };

  const updateCatalogs = async (status) => {
    if (status === 200) {
      const ingredients = await service.get().then((res) => {
        return res.data.body.map((item) => ({
          value: item._id,
          label: item.label,
        }));
      });
      setCatalogs({
        flours: flours,
        ingredients: ingredients,
      });
    }
    toggle();
  };

  const handleCancel = (row) => {
    setRow(null);
    toggle();
  };

  const handleAddRow = () => {
    setRow({ id: 0, label: "" });
    toggle();
  };

  const ingredientsList = ingredients.map((row) => (
    <CardAdd
      id={row.value}
      key={row.value}
      label={row.label}
      className="row d-flex bg-custom-white mb-1 w-100 ms-1"
      onModify={handleModify}
      onDelete={handleDelete}
    />
  ));

  return (
    <div
      style={{
        overflowY: "auto",
        height: `${ingredients.length > 15 ? "58vh" : ""}`,
        paddingRight: "20px",
      }}
    >
      <CardHeader
        ingredient="Administrar Ingredientes"
        onAdd={handleAddRow}
        className="row d-flex align-items-center bg-custom-info w-100 ms-1 mb-1"
      />

      {ingredientsList}

      {row && showModal && (
        <Modal onClose={toggle}>
          <form style={{ border: "2px solid ", marginLeft: "5px" }}>
            <div className="ms-1 me-1">
              <div className="btn-custom-success mb-2">
                <label className="form-label">Tipo de Harina</label>
              </div>
              <input
                type="text"
                style={{ width: "100%" }}
                id="flour"
                value={row.label}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text  mb-2">
                Agregar o modificar ingrediente.
              </div>
            </div>
            <div className="d-flex justify-content-center mb-2">
              <button
                type="button"
                className="btn btn-link me-2"
                onClick={handleCancel}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn btn-link"
                onClick={handleProcess}
              >
                {row.id === 0 ? "Agregar" : "Modificar"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddIngredient;
