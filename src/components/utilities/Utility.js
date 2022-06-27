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
