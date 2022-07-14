import React, { createContext, useCallback, useContext, useState } from "react";
import { getPercentages } from "../util/utility";

const BakeryContext = createContext();

export const BakeryProvider = (props) => {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState({ amount: 0, perUnit: 0 });
  const [data, setData] = useState([]);

  const reset = useCallback(() => {
    setTitle("");
    setData([]);
    setOrder({ amount: 0, perUnit: 0 });
  }, []);

  const onOrder = useCallback((newAmount, newPerUnit) => {
    setOrder({
      amount: newAmount,
      perUnit: newPerUnit,
    });

    //Actualizar data al valor introducido
    setData((currentData) => {
      const datos = updateGrams(currentData, {
        amount: newAmount,
        perUnit: newPerUnit,
      });
      return datos;
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
    const percentages = getPercentages(newData);

    const total = order.amount * order.perUnit;

    const test = newData.map((item) => {
      return {
        ...item,
        grams:
          percentages !== 0
            ? Math.round(((item.percentage * total) / percentages) * 100) / 100
            : percentages,
      };
    });
    return test;
  };

  const value = {
    title,
    order,
    data,
    setTitle,
    onOrder,
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
