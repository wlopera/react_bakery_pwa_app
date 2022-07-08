import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const token = localStorage.getItem("token");
  console.log(1111111111, token);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-custom-secondary"
      style={{ color: "white" }}
    >
      <div className="container-fluid">
        <h1>Fórmula Panadera</h1>

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
              {!token && (
                <li className="nav-item">
                  <NavLink
                    to="/addFlour"
                    activeClassName={classes.active}
                    className="nav-link"
                  >
                    Agregar Harinas
                  </NavLink>
                </li>
              )}
              {token && (
                <li className="nav-item">
                  <NavLink
                    to="/addIngredient"
                    activeClassName={classes.active}
                    className="nav-link"
                  >
                    Agregar Ingredientes
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink
                  to="/home"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  Recetas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  Administrador
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
