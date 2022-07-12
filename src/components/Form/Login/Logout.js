import React from "react";

import { useHistory } from "react-router-dom";

const Logout = () => {
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const handleClose = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4 border-bottom">
                  Cerrar Administración
                </h1>

                <form
                  className="needs-validation"
                  noValidate={true}
                  autoComplete="off"
                  //onSubmit={handleSubmit}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <button
                          type="buttom"
                          className="btn btn-primary w-100"
                          onClick={handleClose}
                        >
                          Cancelar
                        </button>
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={handleSubmit}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Derechos reservados &copy;wlopera 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logout;
