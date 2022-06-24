import ingredients from "./ingredients.json";

export const columns = [
  {
    dataField: "id",
    text: "Identificador",
    align: "center",
    headerStyle: { backgroundColor: "#EAA53B" },
    headerAlign: "center",
    footer: "",
    editable: false,
    hidden: true,
  },
  {
    dataField: "ingredient.isflour",
    text: "Parte de la Harina",
    align: "center",
    headerStyle: { backgroundColor: "#EAA53B" },
    headerAlign: "center",
    footer: "",
    editable: false,
    formatter: (cell, row) => (row.ingredient.isflour === "true" ? "Si" : "No"),
  },
  {
    dataField: "ingredient.text",
    text: "Ingrediente",
    align: "left",
    headerStyle: { backgroundColor: "#EAA53B" },
    headerAlign: "center",
    footer: "",
    editable: false,
  },
  {
    dataField: "percentage",
    text: "Procentaje",
    align: "center",
    headerStyle: { backgroundColor: "#EAA53B" },
    headerAlign: "center",
    footerAlign: "center",
    editable: false,
    footer: (columnData) => {
      return (
        Math.round(columnData.reduce((acc, item) => acc + item) * 100) / 100
      ).toFixed(2);
    },
  },
  {
    dataField: "gramsApprox",
    text: "Gramos Aproximados",
    align: "center",
    headerStyle: { backgroundColor: "#EAA53B" },
    headerAlign: "center",
    footerAlign: "center",
    editable: false,
    footer: (columnData) =>
      (
        Math.round(columnData.reduce((acc, item) => acc + item) * 100) / 100
      ).toFixed(2),
  },
  {
    dataField: "grams",
    text: "Gramos Exactos",
    align: "center",
    headerStyle: { backgroundColor: "#EAA53B" },
    headerAlign: "center",
    footerAlign: "center",
    editable: false,
    footer: (columnData) =>
      (
        Math.round(columnData.reduce((acc, item) => acc + item) * 100) / 100
      ).toFixed(2),
  },
];

// export const initData = [
//   {
//     id: 1,
//     percentage: 100,
//     grams: 3685.5,
//     ingredient: {
//       id: 1,
//       value: "Harina Panadera",
//       label: "Harina Panadera",
//       isflour: "true",
//     },
//   },
//   {
//     id: 2,
//     percentage: 60,
//     grams: 2211.3,
//     ingredient: {
//       id: 5,
//       value: "Agua",
//       label: "Agua",
//       isflour: "false",
//     },
//   },
//   {
//     id: 3,
//     percentage: 1.8,
//     grams: 66.34,
//     ingredient: {
//       id: 6,
//       value: "Levadura",
//       label: "Levadura",
//       isflour: "false",
//     },
//   },
//   {
//     id: 4,
//     percentage: 1.0,
//     grams: 36.86,
//     ingredient: {
//       id: 7,
//       value: "Sal",
//       label: "Sal",
//       isflour: "false",
//     },
//   },
// ];

export default ingredients;
