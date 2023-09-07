import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "../Users/Login";
import SignUp from "../Users/Signup";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

export default function Navbar({ bg, login }) {
  const navigate = useNavigate();
  const getHomepage = () => {
    navigate("/");
  };
  let [userLogin, setUserLogin] = useState(null);
  let onSuccess = (response) => {
    localStorage.setItem("auth_token", response.credential); //can be like token= response.cred..
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Successful!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => window.location.reload());
  };

  let onError = () => {
    alert("Login Failed");
  };

  let logout = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth_token");
        window.location.reload();
      }
    });
  };
  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    if (token) {
      let decoded = jwt_decode(token);
      setUserLogin(decoded);
    } else {
      setUserLogin(null);
    }
  }, []);
  return (
    <>
      <GoogleOAuthProvider clientId="263148022359-f2gtatcn7s3afukeqjf877ooee8rmgjg.apps.googleusercontent.com">
        <Login success={onSuccess} error={onError} />
        <SignUp success={onSuccess} error={onError} />
        <div className="container-fluid m-0 p-0 ">
          <section
            className={
              "d-flex flex-row text-center justify-content-between header " + bg
            }
          >
            <div
              className="ms-lg-5 ms-2 mt-2 cursor-pointer "
              onClick={getHomepage}
            >
              <p
                className={
                  "logo mt-lg-2 mt-4 bg-white rounded-circle secondLogo "
                }
              >
                e!
              </p>
            </div>
            {userLogin === null ? (
              <div className={login}>
                <div className="d-flex flex-row justify-content-end  pe-lg-5 pe-4 mt-2">
                  <button
                    className="btn mt-lg-3 me-lg-4 me-1  text-white mt-4 "
                    data-bs-toggle="modal"
                    data-bs-target="#login"
                  >
                    Login
                  </button>
                  <div>
                    <button
                      className="btn border-white mt-lg-3  mt-4 text-white me-1 "
                      data-bs-toggle="modal"
                      data-bs-target="#sign-up"
                    >
                      Create an Account
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end pe-lg-5 mt-2">
                  <button
                    className="btn mt-lg-3 me-lg-4 me-1  text-white mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#login"
                  ></button>
                </div>
              </div>
            ) : (
              <div>
                <div className="d-flex flex-row justify-content-end pe-lg-5 mt-2">
                  <button className="btn mt-lg-3 me-lg-4 me-1  text-white mt-4">
                    {userLogin.name}
                  </button>
                  <div>
                    <button
                      className="btn border-white mt-lg-3  mt-4 text-white me-1"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end pe-lg-5 mt-2">
                  <button className="btn mt-lg-3 me-lg-4 me-1  text-white mt-4"></button>
                </div>
              </div>
            )}
          </section>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
