import React, { createContext, useCallback, useContext, useState } from "react";

const FlourContext = createContext();

export const FlourProvider = (props) => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [percentages, setPercentages] = useState(0);
  const [grams, setGrams] = useState(0);

  const resetFlour = useCallback(() => {
    setTitle("");
    setData([]);
    setPercentages(0);
    setGrams(0);
  }, []);

  const addFlour = useCallback((flour) => {
    setData((currentData) => {
      let newData = [...currentData, flour];

      // Ordenar la lista de harinas
      if (newData.length > 0) {
        newData = newData.sort((row1, row2) =>
          row1.value > row2.value ? 1 : -1
        );
      }

      processData(newData);
      return newData;
    });
  }, []);

  const updateFlour = useCallback((flour) => {
    setData((currentData) => {
      const newData = currentData.map((item) => {
        if (item.value === flour.value) {
          return {
            ...item,
            percentage: flour.percentage,
            grams: flour.grams,
          };
        }
        return item;
      });

      processData(newData);
      return newData;
    });
  }, []);

  const removeFlour = useCallback((value) => {
    setData((currentData) => {
      const newData = currentData.filter((item) => item.value !== value);
      processData(newData);
      return newData;
    });
  }, []);

  const updateGramsFlour = useCallback((newPercentages, newGrams) => {
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
    title,
    data,
    percentages,
    grams,
    setTitle,
    resetFlour,
    addFlour,
    updateFlour,
    removeFlour,
    updateGramsFlour,
  };

  return (
    <FlourContext.Provider value={value}>
      {props.children}
    </FlourContext.Provider>
  );
};

export const useFlour = () => {
  const context = useContext(FlourContext);
  if (!context) {
    throw new Error("useFlour debe estar dentro del proveedor FlourProvider");
  }
  return context;
};
