import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        background: "linear-gradient(110deg, #e55ce5 40%, #4bff63 60%)",
      }}
    >
      <div className="container-fluid">
        <h1 className="w-50">Fórmula Panadera</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className={classes.nav}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/ingredients"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  Por Porcentajes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/grams"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  Por Gramos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/help"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  Ayuda
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  A cerca de
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
