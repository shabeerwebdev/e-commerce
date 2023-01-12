import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Intro from "../../components/Intro";
import svgsa from "../../assets/icons/visibility.svg";

import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { clearErrMessage, clearMessage } from "../../slices/messages";

import * as Yup from "yup";
import { login, register } from "../../slices/auth";

function Auth() {
  const [hidePassword, sethidePassword] = useState(true);
  useEffect(() => {
    const input = document.getElementById("input3");

    hidePassword ? (input.type = "password") : (input.type = "text");
  });

  const navigate = useNavigate();
  const [hideRegister, setHideRegister] = useState(true);

  const inputRef1svg = useRef();
  const inputRef2svg = useRef();
  const inputRef3svg = useRef();
  const hidePswdRef = useRef();

  const wrapperRef = useRef();

  const addClass = (e) => {
    dispatch(clearMessage());
    dispatch(clearErrMessage());
    if (e.target.id === "input1") {
      inputRef1svg.current.classList.add("bgma");
    } else if (e.target.id === "input2") {
      inputRef2svg.current.classList.add("bgma");
    } else if (e.target.id === "input3") {
      inputRef3svg.current.classList.add("bgma");
    }
  };

  const removeClass = (e) => {
    if (e.target.name === "username") {
      inputRef1svg.current.classList.remove("bgma");
    } else if (e.target.name === "email") {
      inputRef2svg.current.classList.remove("bgma");
    } else if (e.target.name === "password") {
      inputRef3svg.current.classList.remove("bgma");
    }
  };

  const showEmail = () => {
    wrapperRef.current.classList.add("bgma2");
    setHideRegister((prev) => !prev);

    setTimeout(() => {
      wrapperRef.current.classList.remove("bgma2");
    }, 2000);
  };

  useEffect(() => {
    const inputRef1 = document.getElementById("input1");
    const inputRef2 = document.getElementById("input2");
    const inputRef3 = document.getElementById("input3");

    // console.log(hidePswdRef.current);

    const inputNode = [inputRef1, inputRef2, inputRef3];
    inputNode.forEach((element) => {
      element.addEventListener("focus", addClass);
    });
    inputNode.forEach((element) => {
      element.addEventListener("blur", removeClass);
    }, []);

    return () => {
      inputNode.forEach((element) => {
        element.removeEventListener("focus", addClass);
      });
      inputNode.forEach((element) => {
        element.removeEventListener("blur", removeClass);
      });
    };
  });

  const [loading, setLoading] = useState(false);
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const { message, errMessage } = useSelector((state) => state.message);

  // console.log(message, errMessage, "message, errMessage");

  const form = document.getElementById("form");

  useEffect(() => {
    setTimeout(() => {
      form && message && form.classList.add("lightSpeedOut");
    }, 1000);
    setTimeout(() => {
      // dispatch(clearMessage()); // this could avoid shake when switching login / register
      form && message && form.classList.remove("lightSpeedOut");
    }, 300);

    form && errMessage && form.classList.add("shake");
    setTimeout(() => {
      // dispatch(clearerrMessage()); // this could avoid shake when switching login / register
      form && message && form.classList.remove("shake");
    }, 300);
  });

  const dispatch = useDispatch();
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    dispatch(clearErrMessage());
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "Must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("Username is required!"),
    // hideRegister: Yup.boolean(),
    // email: Yup.string()
    //   .email()
    //   .when("hideRegister", {
    //     is: true,
    //     then: Yup.string()
    //       .email("This is not a valid email.")
    //       .required("Email is required!"),
    //   }),

    email: Yup.string()
      .email("This is not a valid email.")
      .required("Email is required!"),

    password: Yup.string()
      .test(
        "len",
        "Must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    // if (username && password) {
    setLoading(true);
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        setLoading(false);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
    // }
  };

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;
    setSuccessful(false);
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        setHideRegister(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  // console.log(isLoggedIn, "jk");
  return (
    <div className="auth-wrapper">
      <Intro />

      <Formik
        initialValues={initialValues}
        validationSchema={hideRegister ? null : validationSchema}
        onSubmit={hideRegister ? handleLogin : handleRegister}
      >
        <Form id="form" autoComplete="off" className="auth">
          <div className="hideRegister" onClick={showEmail}>
            {hideRegister ? "Register" : "Login"}
          </div>
          <div className="input-wrapper">
            <svg
              ref={inputRef1svg}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Field
              id="input1"
              name="username"
              placeholder="Full Name"
              type="text"
            />

            <ErrorMessage name="username" component="p" className="alert " />
          </div>

          <div
            ref={wrapperRef}
            className="input-wrapper"
            style={{ display: hideRegister ? "none" : "flex" }}
          >
            <svg
              ref={inputRef2svg}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Field id="input2" name="email" placeholder="Email" type="email" />

            <ErrorMessage name="email" component="p" className="alert " />
          </div>

          <div className="input-wrapper">
            <svg
              ref={inputRef3svg}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 8.99994C17 8.48812 16.8047 7.9763 16.4142 7.58579C16.0237 7.19526 15.5118 7 15 7M15 15C18.3137 15 21 12.3137 21 9C21 5.68629 18.3137 3 15 3C11.6863 3 9 5.68629 9 9C9 9.27368 9.01832 9.54308 9.05381 9.80704C9.11218 10.2412 9.14136 10.4583 9.12172 10.5956C9.10125 10.7387 9.0752 10.8157 9.00469 10.9419C8.937 11.063 8.81771 11.1823 8.57913 11.4209L3.46863 16.5314C3.29568 16.7043 3.2092 16.7908 3.14736 16.8917C3.09253 16.9812 3.05213 17.0787 3.02763 17.1808C3 17.2959 3 17.4182 3 17.6627V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H7V19H9V17H11L12.5791 15.4209C12.8177 15.1823 12.937 15.063 13.0581 14.9953C13.1843 14.9248 13.2613 14.8987 13.4044 14.8783C13.5417 14.8586 13.7588 14.8878 14.193 14.9462C14.4569 14.9817 14.7263 15 15 15Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Field
              id="input3"
              name="password"
              placeholder="Password"
              // type="password"
            />
            {hidePassword ? (
              <svg
                onClick={() => sethidePassword((prev) => !prev)}
                width="44"
                height="34"
                viewBox="0 0 44 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.45 19.6703L27.25 17.528C28.1167 15.2233 27.6667 13.3082 25.9 11.7826C24.1333 10.257 22.2167 9.86754 20.15 10.6141L17.95 8.47178C18.5167 8.11473 19.15 7.85505 19.85 7.69275C20.55 7.53046 21.2667 7.44931 22 7.44931C24.3667 7.44931 26.375 8.25268 28.025 9.85942C29.675 11.4662 30.5 13.4218 30.5 15.7265C30.5 16.4406 30.4083 17.1466 30.225 17.8444C30.0417 18.5423 29.7833 19.1509 29.45 19.6703ZM35.9 25.9512L33.9 24.0036C35.5333 22.8351 36.9583 21.5286 38.175 20.0841C39.3917 18.6397 40.2833 17.1871 40.85 15.7265C39.1833 12.1235 36.6833 9.27515 33.35 7.18152C30.0167 5.08788 26.4 4.04107 22.5 4.04107C21.1 4.04107 19.6667 4.17091 18.2 4.43058C16.7333 4.69026 15.5833 4.99862 14.75 5.35568L12.45 3.06729C13.6167 2.54794 15.1083 2.0935 16.925 1.70399C18.7417 1.31448 20.5167 1.11972 22.25 1.11972C27.0167 1.11972 31.375 2.44244 35.325 5.08789C39.275 7.73333 42.1667 11.2795 44 15.7265C43.1333 17.8039 42.0167 19.7027 40.65 21.4231C39.2833 23.1434 37.7 24.6528 35.9 25.9512ZM35.325 33.9549L30.4 28.9212C29.2333 29.3756 27.9167 29.7246 26.45 29.968C24.9833 30.2115 23.5 30.3332 22 30.3332C17.1333 30.3332 12.7167 29.0105 8.75 26.365C4.78333 23.7196 1.86667 20.1734 0 15.7265C0.666667 14.0386 1.59167 12.3913 2.775 10.7845C3.95833 9.17777 5.4 7.64406 7.1 6.18339L2.9 2.09365L5 2.17756e-05L37.275 31.8126L35.325 33.9549ZM9.15 8.22834C7.91667 9.10474 6.725 10.257 5.575 11.6853C4.425 13.1135 3.6 14.4605 3.1 15.7265C4.8 19.3295 7.35833 22.1778 10.775 24.2714C14.1917 26.365 18.0667 27.4119 22.4 27.4119C23.5 27.4119 24.5833 27.3469 25.65 27.2171C26.7167 27.0873 27.5167 26.8925 28.05 26.6328L24.85 23.5167C24.4833 23.679 24.0333 23.8007 23.5 23.8819C22.9667 23.963 22.4667 24.0036 22 24.0036C19.6667 24.0036 17.6667 23.2084 16 21.6178C14.3333 20.0273 13.5 18.0635 13.5 15.7265C13.5 15.2396 13.5417 14.7527 13.625 14.2658C13.7083 13.7789 13.8333 13.3407 14 12.9512L9.15 8.22834Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                onClick={() => sethidePassword((prev) => !prev)}
                width="44"
                height="30"
                viewBox="0 0 44 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 23.5C24.3667 23.5 26.375 22.675 28.025 21.025C29.675 19.375 30.5 17.3667 30.5 15C30.5 12.6333 29.675 10.625 28.025 8.975C26.375 7.325 24.3667 6.5 22 6.5C19.6333 6.5 17.625 7.325 15.975 8.975C14.325 10.625 13.5 12.6333 13.5 15C13.5 17.3667 14.325 19.375 15.975 21.025C17.625 22.675 19.6333 23.5 22 23.5ZM22 20.6C20.4333 20.6 19.1083 20.0583 18.025 18.975C16.9417 17.8917 16.4 16.5667 16.4 15C16.4 13.4333 16.9417 12.1083 18.025 11.025C19.1083 9.94167 20.4333 9.4 22 9.4C23.5667 9.4 24.8917 9.94167 25.975 11.025C27.0583 12.1083 27.6 13.4333 27.6 15C27.6 16.5667 27.0583 17.8917 25.975 18.975C24.8917 20.0583 23.5667 20.6 22 20.6ZM22 30C17.1333 30 12.7333 28.6167 8.8 25.85C4.86667 23.0833 1.93333 19.4667 0 15C1.93333 10.5333 4.86667 6.91667 8.8 4.15C12.7333 1.38333 17.1333 0 22 0C26.8667 0 31.2667 1.38333 35.2 4.15C39.1333 6.91667 42.0667 10.5333 44 15C42.0667 19.4667 39.1333 23.0833 35.2 25.85C31.2667 28.6167 26.8667 30 22 30ZM22 27C26.0333 27 29.7417 25.9083 33.125 23.725C36.5083 21.5417 39.0833 18.6333 40.85 15C39.0833 11.3667 36.5083 8.45833 33.125 6.275C29.7417 4.09167 26.0333 3 22 3C17.9667 3 14.2583 4.09167 10.875 6.275C7.49167 8.45833 4.9 11.3667 3.1 15C4.9 18.6333 7.49167 21.5417 10.875 23.725C14.2583 25.9083 17.9667 27 22 27Z"
                  fill="black"
                />
              </svg>
            )}

            <ErrorMessage name="password" component="p" className="alert " />
          </div>

          <div className="login-action">
            <button type="submit">
              {loading ? (
                <div className="dots-7"></div>
              ) : hideRegister ? (
                <p>Login</p>
              ) : (
                <p>Register</p>
              )}
            </button>
            <span>or</span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32 16.3637C32 15.2292 31.8961 14.1383 31.7032 13.091H16.3265V19.2801H25.1132C24.7347 21.2801 23.5844 22.9746 21.8553 24.1092V28.1237H27.1317C30.2189 25.3382 32 21.2364 32 16.3637Z"
                fill="#4285F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.3265 31.9999C20.7347 31.9999 24.4304 30.5673 27.1317 28.1237L21.8553 24.1092C20.3933 25.0692 18.5232 25.6363 16.3265 25.6363C12.0742 25.6363 8.47497 22.8218 7.19111 19.04H1.73656V23.1854C4.42302 28.4145 9.94436 31.9999 16.3265 31.9999Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.19111 19.04C6.86458 18.08 6.67904 17.0546 6.67904 16.0001C6.67904 14.9455 6.86457 13.9201 7.1911 12.9601V8.81462H1.73655C0.630798 10.9746 0 13.4182 0 16.0001C0 18.5819 0.630805 21.0254 1.73656 23.1854L7.19111 19.04Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.3265 6.36363C18.7236 6.36363 20.8757 7.1709 22.5677 8.75635L27.2505 4.16727C24.423 1.58545 20.7273 0 16.3265 0C9.94436 0 4.42301 3.58553 1.73655 8.81462L7.1911 12.9601C8.47496 9.17825 12.0742 6.36363 16.3265 6.36363Z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <div className="hideRegister2" onClick={showEmail}>
            {errMessage && <div className="alert-danger">{errMessage}</div>}
            {message && <div className="alert-success">{message}</div>}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Auth;
