import React, { useState, useEffect, useRef } from "react";
import { CircleUserRound} from "lucide-react";
import PasswordField from "../Fields/passwordField";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../Fields/textField";
import EmailField from "../Fields/emailField";

const SignUpForm = () => {
  const prevCheckedEmail = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isUserExist, setIsUserExist] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!formData.email) {
      setIsEmailValid(null);
    }
    if (formData.password === formData.confirmPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
    if (formData.password && checkPasswordValid(formData.password)) {
      setIsPasswordValid(true);
    }
  }, [formData]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setIsEmailValid(null);
    if (name === "password") {
      setIsPasswordValid(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const checkPasswordValid = (password) => {
    if (password.length < 8) {
      return false;
    }
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(password);
  };

  const checkEmail = async () => {
    const currentEmail = formData.email.trim();
    if (!currentEmail) {
      setIsEmailValid(null);
      return;
    }
    if (!isValidEmail(currentEmail)) {
      setIsEmailValid(false);
      return;
    }

    try {
      setIsEmailLoading(true);
      setIsEmailValid(null);
      if (currentEmail !== prevCheckedEmail.current) {
        const response = await fetch(
          "https://mobiledbserver.onrender.com/api/users/find",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: currentEmail }),
          }
        );

        if (response.status === 404) {
          setIsUserExist(false);
        } else {
          setIsUserExist(true);
          setIsEmailValid(null);
        }
        prevCheckedEmail.current = currentEmail;
      }
    } catch (error) {
      alert("Network Error. check Connection");
      console.error("Error checking email:", error);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUserExist || !isPasswordMatch || !isPasswordValid) {
        return;
      }
      const response = await fetch(
        "https://mobiledbserver.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.status === 201) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: formData.username, email: formData.email })
        );
        navigate("/");
      } else {
        alert("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("Network error. Please try again.");
      }
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

      <div className="signup-form">
        <CircleUserRound
          style={{ width: "50px", height: "50px", margin: "10px" }}
        />
        <form onSubmit={handleSubmit}>

            <TextField
              type="text"
              onChange={(e) => handleChange(e)}
              name="username"
              title="Enter Username"
              placeholder="Username"
              required={true}
              autoComplete="off"
              autoFocus={true}
            />

            <EmailField
              className={`${(isUserExist || isEmailValid === false) && formData.email? "warning":""} ${isUserExist === false && isValidEmail(formData.email)? "success":""}`}
              title="Enter Email"
              onChange={(e) => handleChange(e)}
              name="email"
              placeholder="Email"
              onBlur={checkEmail}
              autoComplete="false"
              required={true}
              isEmailLoading={isEmailLoading}
            />
            

          <PasswordField
            label="Password"
            onChange={(e) => handleChange(e)}
            name="password"
            placeholder="Password"
            required={true}
          />

          <PasswordField
            label="Confirm Password"
            onChange={(e) => handleChange(e)}
            name="confirmPassword"
            placeholder="Confirm Password"
            required={true}
          />
          <h4
            className={`fade-in ${isPasswordValid === false ? "" : "hidden"}`}
          >
            Password must contain 8 characters and be alphanumeric.
          </h4>
          <h4
            className={`fade-in ${
              !isPasswordMatch && formData.password && formData.confirmPassword
                ? ""
                : "hidden"
            }`}
          >
            Password does not match.
          </h4>
          <h4 className={`fade-in ${isUserExist && formData.email? '':'hidden'}`}>
             User already Exists! 
          </h4>
          <h4 className={`fade-in ${isEmailValid === false? '':'hidden'}`}>
            Email is not Valid.
          </h4>

          {isUserExist === false ? (
            <button className={`btn sign-up-btn `} type="submit">
              SIGN UP
            </button>
          ) : (
            <button className={`btn sign-up-btn `} type="submit" disabled>
              SIGN UP
            </button>
          )}
        </form>
        <Link to="/login" className='link' title="Log In ">
          Already User? Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpForm;
