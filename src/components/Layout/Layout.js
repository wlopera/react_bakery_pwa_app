import React from "react";

import bg_bread from "../../assets/bg_bread.png";

const Layout = (props) => {
  return (
    <div
      className=" d-flex justify-content-center bg-image"
      style={{
        backgroundImage: ` url(${bg_bread})`,
        height: "100vh",
      }}
    >
      <section className=" container w-100 mt-2">{props.children}</section>
    </div>
  );
};

export default Layout;
