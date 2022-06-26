import React from "react";

const Utility = () => {
  return <div>Utility</div>;
};

export default Utility;

export const newRow = (type) => ({
  id: -1,
  key: -1,
  value: -1,
  text: "",
  number: 0,
  type,
});

export const editRow = (item, number, type) => ({
  id: item.id,
  key: item.id,
  value: item.value,
  text: item.text,
  number,
  type,
});

export const processRow = (row, data) => {
  const oldData = data.filter((item) => item.id === row.id);

  if (oldData.length > 0) {
    return data.map((item) => {
      if (item.id === row.id) {
        return {
          ...item,
          percentage: row.percentage,
          grams: row.grams,
        };
      }
      return item;
    });
  } else {
    return [...data, row];
  }
};
