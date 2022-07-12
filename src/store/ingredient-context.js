import React, { createContext, useCallback, useContext, useState } from "react";

const IngredientContext = createContext();

export const IngredientProvider = (props) => {
  const [data, setData] = useState([]);
  const [percentages, setPercentages] = useState(0);
  const [grams, setGrams] = useState(0);

  const resetIngredient = useCallback(() => {
    setData([]);
    setPercentages(0);
    setGrams(0);
  }, []);

  const addIngredient = useCallback((ingredient) => {
    setData((currentData) => {
      let newData = [...currentData, ingredient];

      // Ordenar la lista de harinas
      if (newData.length > 0) {
        newData = newData.sort((row1, row2) =>
          row1.ingredient > row2.ingredient ? 1 : -1
        );
      }

      processData(newData);
      return newData;
    });
  }, []);

  const updateIngredient = useCallback((ingredient) => {
    setData((currentData) => {
      const newData = currentData.map((item) => {
        if (item.value === ingredient.value) {
          return {
            ...item,
            percentage: ingredient.percentage,
            grams: ingredient.grams,
          };
        }
        return item;
      });

      processData(newData);
      return newData;
    });
  }, []);

  const removeIngredient = useCallback((value) => {
    setData((currentData) => {
      const newData = currentData.filter((item) => item.value !== value);
      processData(newData);
      return newData;
    });
  }, []);

  const updateGramsIngredient = useCallback((newPercentages, newGrams) => {
    setData((currentData) => {
      const percentages = newPercentages;
      const grams = newGrams;

      const newData = currentData.map((item) => {
        return {
          ...item,
          grams:
            Math.round(((item.percentage * grams) / percentages) * 100) / 100,
        };
      });
      processData(newData);
      return newData;
    });
  }, []);

  const processData = (newData) => {
    // Porcentajes de harinas
    const newPercentages =
      newData.length > 0
        ? newData.map((item) => parseFloat(item.percentage))
        : [];

    // Porcentajes de gramos de harinas
    const newGrams =
      newData.length > 0 ? newData.map((item) => parseFloat(item.grams)) : [];

    let isValid = true;
    for (let index = 0; index < newPercentages.length; index++) {
      if (isNaN(newPercentages[index])) {
        isValid = false;
        break;
      }
    }

    setPercentages(
      isValid
        ? Math.round(
            newPercentages.reduce((acc, item) => acc + item, 0) * 100
          ) / 100
        : 0.0
    );

    setGrams(
      Math.round(newGrams.reduce((acc, item) => acc + item, 0) * 100) / 100
    );
  };

  const value = {
    data,
    percentages,
    grams,
    resetIngredient,
    addIngredient,
    updateIngredient,
    removeIngredient,
    updateGramsIngredient,
  };

  return (
    <IngredientContext.Provider value={value}>
      {props.children}
    </IngredientContext.Provider>
  );
};

export const useIngredient = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error(
      "useIngredient debe estar dentro del proveedor IngredientProvider"
    );
  }
  return context;
};
