import React from "react";

import bg_bread from "../../assets/bg_bread.png";

// import footer from "../../assets/programming.gif";
// import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center bg-image"
        style={{
          // backgroundImage: `url(${bg_bread}) `,
          right: 0,
          top: 0,
          zIndex: -100,
        }}
      >
        <section className=" container w-100 mt-2">{props.children}</section>
        {/* <div>
          <div className={classes.footer}>
            <img
              src={footer}
              alt="Computer man"
              style={{ width: "32px", height: "32px" }}
            />
            <div className={classes.footerText}>wlopera @2022</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Layout;
