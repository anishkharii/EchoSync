import React from "react";
import LogInForm from './logInForm';
import ForgotPasswordForm from "./forgotPasswordForm";
import SignUpForm from "./signUpform";
import './form.css'
const Form = (props) => {
  return (
    <>
      <div className="form-container">
        <div className="left-container">
          <img src="../images/logInPageImage.jpeg" alt="login Page" />
          <div className="form-text">
            <h2>Chat</h2>
            <p>LIKE PRO</p>
          </div>
        </div>
        <div className="right-container">
            {props.type==='login' && <LogInForm />}
            {props.type==='sign-up' && <SignUpForm />}
            {props.type==='forgot-password' && <ForgotPasswordForm />}
        </div>
      </div>
    </>
  );
};

export default Form;
