import React, { useState } from "react";
import md5 from "md5";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import service from "../../../services/auth.service";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [alert, setAlert] = useState(null);
  const [shown, setShown] = React.useState(false);

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setUser((current) => {
      current[name] = value;
      return current;
    });
    setAlert(null);
  };

  const handeSubmit = async (event) => {
    event.preventDefault();
    setAlert(null);
    localStorage.removeItem("token");
    const res = await service.login({
      username: user.username,
      password: md5(user.password),
    });

    if (res.data.error) {
      setAlert(res.data.error.message);
    } else {
      localStorage.setItem("token", JSON.stringify(res.data.body.token));
    }
  };

  return (
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4 border-bottom">
                  Autenticarse
                </h1>
                {alert && (
                  <div
                    className="alert alert-danger mb-1 me-4  d-flex align-items-center"
                    style={{ height: 0 }}
                  >
                    {alert}
                  </div>
                )}

                <form
                  className="needs-validation"
                  noValidate={true}
                  autoComplete="off"
                  onSubmit={handeSubmit}
                >
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email">
                      Usuario
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={handleInputChange}
                      required
                      autoFocus
                    />
                    <div className="invalid-feedback">Usuario inválido</div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2">
                      <label className="text-muted" htmlFor="password">
                        Contraseña
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-11">
                        <input
                          id="password"
                          type={shown ? "text" : "password"}
                          className="form-control"
                          name="password"
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-1 d-flex align-items-center">
                        <FontAwesomeIcon
                          onClick={() => setShown((current) => !current)}
                          icon={shown ? faEye : faEyeSlash}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-50">
                      Conectarse
                    </button>
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

export default Login;
