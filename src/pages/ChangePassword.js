import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePasswordAction } from "../store/action";
import { useHistory } from "react-router";
import Toast from "../helpers/swalToast";
import Navbar from "../components/Navbar";
function ChangePasswordPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setData({
      ...data,
      [name]: value,
    });
  };

  const changePasswordHandle = (event) => {
    event.preventDefault();
    console.log(data);
    if (data.newPassword !== data.confirmPassword) {
      Toast.fire({
        icon: "warning",
        title: "New Password did not match",
      });
    } else {
      console.log(data.oldPassword, data.newPassword, data.confirmPassword);
      dispatch(
        changePasswordAction(
          { password: data.oldPassword, newPassword: data.newPassword },
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log("masukcb");
              history.push("/");
            }
          }
        )
      );
    }
  };
  return (
    <>
      <Navbar />
      <div className="changepassword-page">
        <div className="changepassword-form-container">
          <div className="changepassword-form">
            <form>
              <h2>Change Password{JSON.stringify(props.location)}</h2>

              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="oldPassword"
                  value={data.oldPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div id="login-validation"></div>

              <button
                type="submit"
                onClick={changePasswordHandle}
                className="btn btn-success"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordPage;
