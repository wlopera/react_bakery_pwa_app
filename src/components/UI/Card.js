import React from "react";

const Card = (props) => {
  return (
    <div className={props.className} onClick={props.onAction}>
      {props.children}
    </div>
  );
};

export default Card;
