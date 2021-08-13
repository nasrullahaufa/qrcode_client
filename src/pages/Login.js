import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/action";
import { useHistory } from "react-router";
function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ username: "", password: "" });
  const checkStatus = useSelector((state) => state.isLogin);
  useEffect(() => {
    console.log(localStorage.getItem("access_token"));
    if (checkStatus || localStorage.getItem("access_token")) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [checkStatus]);
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const loginHandle = (event) => {
    event.preventDefault();
    console.log(login.username, login.password);
    dispatch(loginAction(login));
  };
  return (
    <div id="login" className="login-page">
      <div className="login-form-container">
        <div className="login-form">
          <form>
            <h2>Login{localStorage.getItem("access_token")}</h2>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                className="form-control"
                required
                aria-describedby="emailHelp"
                name="username"
                value={login.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                id="login-password"
                name="password"
                value={login.password}
                onChange={handleChange}
              />
            </div>
            <div id="login-validation"></div>

            <button
              type="submit"
              onClick={loginHandle}
              className="btn btn-success"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
