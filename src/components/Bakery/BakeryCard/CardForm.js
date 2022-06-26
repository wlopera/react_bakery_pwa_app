import React, { useState } from "react";
import Card from "../../UI/Card";

const CardForm = () => {
  const [amount, setAmount] = useState(0);
  const [perUnit, setPerUnit] = useState(0);
  const [total, setTotal] = useState(0);

  const amountHandler = (event) => {
    setAmount(event.target.value);
    setTotal(event.target.value * perUnit);
  };

  const perUnitHandler = (event) => {
    setPerUnit(event.target.value);
    setTotal(event.target.value * amount);
  };

  return (
    <Card>
      <div className="row  col-row-sm-1 col-row-md-3">
        <div className="col-sm col-md-auto">
          <input
            type="number"
            value={amount}
            onChange={amountHandler}
            placeholder="Cantidad"
            className="form-control"
          />
        </div>
        <div className="col-sm col-md-auto">
          <input
            type="number"
            value={perUnit}
            onChange={perUnitHandler}
            placeholder="Gramos c/u"
            className="form-control"
          />
        </div>
        <div className="col-sm col-md-auto">
          <span htmlFor="perUnit" className="form-control">
            {total} grs.
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CardForm;

// const updateData = (total, records) => {
//   setAlert(null);
//   const percentages = records.map((item) => parseFloat(item.percentage));
//   const perTotalTemp = percentages.reduce((acc, item) => acc + item);

//   const dataOnlyFlour = records.filter(
//     (item) => item.ingredient.isflour === "true"
//   );

//   const percentagesFlour =
//     dataOnlyFlour.length > 0
//       ? dataOnlyFlour.map((item) => parseFloat(item.percentage))
//       : [];

//   const perTotalOnlyFlour =
//     percentagesFlour.length > 0
//       ? percentagesFlour.reduce((acc, item) => acc + item)
//       : 0;

//   let dataTotal = [];

//   if (perTotalOnlyFlour === 100) {
//     const gramsFlour = perTotalTemp !== 0 ? (100 * total) / perTotalTemp : 0;
//     const bakerFactor = gramsFlour / 100;

//     dataTotal = records.map((item) => {
//       const gramsOnlyFlour = (item.percentage * total) / perTotalTemp;
//       const gramsOthers = item.percentage * bakerFactor;
//       return {
//         ...item,
//         percentage: parseFloat(item.percentage),
//         gramsApprox:
//           item.ingredient.isflour === "true"
//             ? Math.round(gramsOnlyFlour)
//             : Math.round(gramsOthers),
//         grams:
//           item.ingredient.isflour === "true"
//             ? Math.round(gramsOnlyFlour * 100) / 100
//             : Math.round(gramsOthers * 100) / 100,
//       };
//     });
//   } else {
//     setAlert({
//       color: "red",
//       message: "La harina total debe ser 100%",
//     });
//     dataTotal = records.map((item) => ({
//       ...item,
//       percentage: parseFloat(item.percentage),
//       gramsApprox: 0,
//       grams: 0.0,
//     }));
//   }
//   return dataTotal;
// };
