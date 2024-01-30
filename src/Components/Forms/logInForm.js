import React, { useState } from "react";
import {
  CircleUserRound,
  Mail,
} from "lucide-react";
import "./form.css";
import { useNavigate } from "react-router-dom";
import PasswordField from "../Fields/passwordField";
import EmailField from "../Fields/emailField";

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsWrongCredentials(null);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailValidation = () => {
    if (isValidEmail(formData.email)) {
      setIsEmailValid(true);
      return true;
    } else {
      setIsEmailValid(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://mobiledbserver.onrender.com/api/users/findAndVerify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: formData.username,
            email: formData.email,
          })
        );
        navigate("/");
      }
      else {
        setIsWrongCredentials(true);
      }
    } catch (error) {
      alert("Backend Error. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      <div className="login-form">
        <CircleUserRound
          style={{ width: "50px", height: "50px", margin: "10px" }}
        />
        <form onSubmit={handleSubmit}>

            <EmailField
              className={formData.email && isEmailValid === false ? "warning" : ""}
              title="Enter Email"
              onChange={(e) => handleChange(e)}
              name="email"
              onBlur={(e) => {
                handleEmailValidation();
              }}
              onFocus={(e) => {
                setIsEmailValid(null);
              }}
              placeholder="Email"
              autoComplete="off"
              required={true}
              autoFocus
            />

          <PasswordField
            name="password"
            placeholder="Enter Password"
            onChange={(e) => handleChange(e)}
            label="Enter Password"
            required={true}
          />

          <a href="/forgot-password" title="Change Password">
            Forgot Password
          </a>

          <h4>{isWrongCredentials && "Email or Password is Wrong."}</h4>
          <h4>
            {formData.email && isEmailValid === false && "Email is not valid"}
          </h4>
          <button className="btn log-in-btn " type="submit">
            SIGN IN
          </button>
        </form>
        <a href="/add-user" title="Log In ">
          Create Account
        </a>
      </div>
    </>
  );
};

export default LogInForm;
