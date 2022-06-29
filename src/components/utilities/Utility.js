import React from "react";

const Utility = () => {
  return <div>Utility</div>;
};

export default Utility;

export const newRow = (type) => ({
  amount: 0,
  ingredient: [],
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
