import { Redirect } from "react-router";
import Toast from "../helpers/swalToast";

import axios from "axios";


// const server = "http://localhost:3001"
const server = "https://sanodoc-qrcode.herokuapp.com";
export function loginAction(payload) {
  return function (dispatch) {
    fetch(server + "/user/login", {
      method: "POST",

      body: JSON.stringify(payload),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          Toast.fire({
            icon: "warning",
            title: result.error,
          });
        } else {
          localStorage.setItem("access_token", JSON.stringify(result.access_token));
          dispatch(setLogin(true));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function setLogin(payload) {

  return { type: "SET_LOGIN", payload };
}
export function setIsDataFetched(payload) {
  return { type: "SET_IS_DATA_FETCHED", payload };
}
export function setPageAction(payload) {
  return { type: "SET_CURRENT_PAGE", payload };
}
export function setSearchKeyword(payload) {
  return { type: "SET_KEYWORD", payload };
}

export function setDocuments(payload) {

  return { type: "SET_DOCUMENTS", payload };
}

export function uploadAction(payload) {
  console.log(payload);
  return function (dispatch) {
    const formData = new FormData();
    formData.append("File", payload);
    fetch(server + "/documents", {
      method: "POST",
      body: formData,
      headers:{
        access_token: JSON.parse(localStorage.getItem("access_token"))
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          Toast.fire({
            icon: "warning",
            title: result.error,
          });
        } else {
          console.log(result, "result");
          document.getElementById("myFile").value = "";
          dispatch(setIsDataFetched(false))
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getDocumentsAction() {
  return function (dispatch) {
  
    fetch(server + "/documents", {
      method: "GET",
      headers:{
        access_token: JSON.parse(localStorage.getItem("access_token"))
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          Toast.fire({
            icon: "warning",
            title: result.error,
          });
        } else {
          console.log(result);
          dispatch({ type: "SET_DOCUMENTS", payload: result });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function downloadAction(doc) {
  return function (dispatch) {
    console.log(doc)

    axios({
      url:doc.url,
      method: 'GET',
      headers:{
        access_token: JSON.parse(localStorage.getItem("access_token"))
      },
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  };
}

export function changePasswordAction(payload,callback) {
  return function (dispatch) {

    // callback('halo','res')

    fetch(server + "/user/changepassword", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        access_token: JSON.parse(localStorage.getItem("access_token"))
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          Toast.fire({
            icon: "warning",
            title: result.error,
          });
          callback(result.error,null)
        } else {
       
          Toast.fire({
            icon: "success",
            title: "Change Password Success",
          });
          callback(null,result)

        }
      })
      .catch((error) => {
        console.log(error);
        callback(error,null)
      });
  };
}