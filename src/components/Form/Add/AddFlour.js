import React, { useContext, useState } from "react";
import CatalogContext from "../../../store/Catalog/catalog-context";
import CardAdd from "../../Bakery/BakeryCard/CardAdd";
import service from "../../../services/flour.service";
import CardHeader from "../../Bakery/BakeryCard/CardHeader";

const AddFlour = () => {
  const [row, setRow] = useState(null);
  const catalogCtx = useContext(CatalogContext);

  const handleInputChange = (event) => {
    setRow((currentRow) => ({
      id: currentRow.id,
      label: event.target.value,
    }));
  };

  const handleModify = (record) => {
    setRow(record);
  };

  const handleDelete = async (id) => {
    setRow(null);
    const res = await service.delete(id);

    console.log(555555555555, res);
    if (res.status === 200) {
      const flours = await service.get().then((res) => {
        return res.data.body.map((item) => ({
          value: item._id,
          label: item.label,
        }));
      });
      catalogCtx.setCatalogs({
        flours: flours,
        ingredients: catalogCtx.ingredients,
      });
    }
  };

  console.log(11111, catalogCtx);
  const flours = catalogCtx.flours.map((row) => (
    <CardAdd
      id={row.value}
      key={row.value}
      label={row.label}
      className="row d-flex bg-primary mb-1 w-100 ms-1"
      onModify={handleModify}
      onDelete={handleDelete}
    />
  ));

  const handleProcess = async () => {
    if (row.id === 0) {
      const res = await service.create({
        label: row.label,
      });
      console.log(222222222222, res);
      if (res.status === 200) {
        const flours = await service.get().then((res) => {
          return res.data.body.map((item) => ({
            value: item._id,
            label: item.label,
          }));
        });
        catalogCtx.setCatalogs({
          flours: flours,
          ingredients: catalogCtx.ingredients,
        });
      }
    } else {
      const res = await service.update(row.id, {
        label: row.label,
      });
      console.log(33333333333, res);
      if (res.status === 200) {
        const flours = await service.get().then((res) => {
          return res.data.body.map((item) => ({
            value: item._id,
            label: item.label,
          }));
        });
        catalogCtx.setCatalogs({
          flours: flours,
          ingredients: catalogCtx.ingredients,
        });
      }
    }
    setRow(null);
  };

  const handleCancel = (row) => {
    setRow(null);
  };

  const handleAddRow = () => {
    setRow({ id: 0, label: "" });
  };

  return (
    <div>
      <CardHeader
        ingredient="Administrar Harinas"
        onAdd={handleAddRow}
        className="row d-flex align-items-center bg-primary w-100"
      />

      {flours}
      {row && (
        <form style={{ border: "2px solid gray" }}>
          <div className="mb-1 ">
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
              className="btn btn-custom-info me-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="btn btn-custom-dark"
              onClick={handleProcess}
            >
              {row.id === 0 ? "Agregar" : "Modificar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFlour;
