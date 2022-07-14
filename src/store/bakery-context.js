import React, { createContext, useCallback, useContext, useState } from "react";

const BakeryContext = createContext();

export const BakeryProvider = (props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [perUnit, setPerUnit] = useState(0);
  const [data, setData] = useState([]);

  const reset = useCallback(() => {
    setTitle("");
    setData([]);
    setAmount(0);
    setPerUnit(0);
  }, []);

  const onAmount = useCallback((value) => {
    setAmount(value);

    setPerUnit((currentPerUnit) => {
      setData((currentData) =>
        updateGrams(currentData, { amount: value, perUnit: currentPerUnit })
      );
      return currentPerUnit;
    });
  }, []);

  const onPerUnit = useCallback((value) => {
    setPerUnit(value);

    setAmount((currentAmount) => {
      setData((currentData) =>
        updateGrams(currentData, { amount: currentAmount, perUnit: value })
      );
      return currentAmount;
    });
  }, []);

  const add = useCallback((flour, order) => {
    setData((currentData) => {
      let newData = [...currentData, flour];

      // Ordenar la lista de harinas
      if (newData.length > 0) {
        newData = newData.sort((row1, row2) =>
          row1.value > row2.value ? 1 : -1
        );
      }
      const datos = updateGrams(newData, order);
      return datos;
    });
  }, []);

  const update = useCallback((flour, order) => {
    setData((currentData) => {
      const newData = currentData.map((item) => {
        if (item.value === flour.value) {
          return {
            ...item,
            percentage: flour.percentage,
            grams: 0,
          };
        }
        return item;
      });

      return updateGrams(newData, order);
    });
  }, []);

  const remove = useCallback((value, order) => {
    setData((currentData) => {
      const newData = currentData.filter((item) => item.value !== value);
      return updateGrams(newData, order);
    });
  }, []);

  const updateGrams = (newData, order) => {
    // Porcentajes total de harinas
    let percentages =
      newData.length > 0
        ? newData.map((item) => parseFloat(item.percentage))
        : [];

    let isValid = true;
    for (let index = 0; index < percentages.length; index++) {
      if (isNaN(percentages[index])) {
        isValid = false;
        break;
      }
    }

    percentages = isValid
      ? Math.round(percentages.reduce((acc, item) => acc + item, 0) * 100) / 100
      : 0.0;

    const total = order.amount * order.perUnit;

    return newData.map((item) => {
      return {
        ...item,
        grams: isValid
          ? Math.round(((item.percentage * total) / percentages) * 100) / 100
          : 0.0,
      };
    });
  };

  const value = {
    title,
    amount,
    perUnit,
    data,
    setTitle,
    onAmount,
    onPerUnit,
    reset,
    add,
    update,
    remove,
  };

  return (
    <BakeryContext.Provider value={value}>
      {props.children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error("useBakery debe estar dentro del proveedor BakeryProvider");
  }
  return context;
};
