import React from "react";
import LogInForm from "./logInForm";
import ForgotPasswordForm from "./forgotPasswordForm";
import SignUpForm from "./signUpform";
import "./form.css";
import { Link } from "react-router-dom";
const Form = (props) => {
  return (
    <>
      <div className="form-container">
        <div className="left-container">
          <div className="form-text">
            <h2 className="site-title">EchoSync</h2>
            <p className="site-tagline">Connect with Echoes.</p>
          </div>
          {props.type !== "forgot-password" && (
            <div className="action-pane">
              <p>
                {props.type === "login"
                  ? "Don't have Account?"
                  : "Have a Account?"}
              </p>
              <Link className="action-link" to={props.type === "login" ? "/add-user" : "/login"}>
                {props.type === "login" ? "Create" : "LogIn"}
              </Link>
            </div>
          )}
        </div>
        <div className="right-container">
          {props.type === "login" && <LogInForm />}
          {props.type === "sign-up" && <SignUpForm />}
          {props.type === "forgot-password" && <ForgotPasswordForm />}
        </div>
      </div>
    </>
  );
};

export default Form;
