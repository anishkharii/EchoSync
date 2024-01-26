import React, { useState, useEffect, useRef } from "react";
import {
  CircleUserRound,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import "./signUpForm.css";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {

  const prevCheckedMail = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    matchPassword: "",
  });
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isMailValid,setIsMailValid] = useState(null);
  const [userExists, setUserExists] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.password !== formData.matchPassword) {
        setPasswordMismatch(true);
      } else {
        setPasswordMismatch(false);
      }
    }, 2000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, [formData.password, formData.matchPassword]);

  useEffect(()=>{
    if(!formData.email){
      setIsMailValid(null);
    }
  },[formData.email])


  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmail = async () => {
    const currentMail = formData.email.trim();
    if (!currentMail) {
      setIsMailValid(null);
      return;
    };
    if(!isValidEmail(currentMail)){
      setIsMailValid(false);
      return;
    }

    try {
      setLoading(true);
      setIsMailValid(null);
      if(currentMail!==prevCheckedMail.current){
        const response = await fetch(
          "https://mobiledbserver.onrender.com/api/users/find",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: currentMail }),
          }
        );
  
        if (response.status === 404) {
          setUserExists(false);
        } else {
          setUserExists(true);
          setIsMailValid(null);
        }
        prevCheckedMail.current = currentMail;
        console.log(prevCheckedMail.current)
      }
      
    } catch (error) {
      console.error("Error checking email:", error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (userExists || passwordMismatch) {
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
        localStorage.setItem("user", JSON.stringify(formData.email));
        navigate("/");
      } else {
        alert("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(`Error: ${error.response.data.error}`);
      } else {
        // The request was made but no response was received
        alert("Network error. Please try again.");
      }
    }
    finally{
      setLoading(false);
    }
  };

  const handlePasswordToggle = (field) => {
    if (field === 1) {
      setShowPasswordOne((prevState) => !prevState);
    } else if (field === 2) {
      setShowPasswordTwo((prevState) => !prevState);
    }
  };

  return (
    <>
    {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="signup-container">
        <div className="left-container">
          <img src="../images/logInPageImage.jpeg" alt="Sign Up Page"/>
          <p><h2>Join</h2>PRO'S ClUB</p>
        </div>
        <div className="right-container">
          <div className="signup-form">
            <CircleUserRound
              style={{ width: "50px", height: "50px", margin: "10px" }}
            />
            <form onSubmit={handleSubmit}>
              <div className={`input-container `}>
                <User style={{ width: "25px", height: "25px" }} />
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  name="username"
                  title="Enter Username"
                  placeholder="Username"
                  required={true}
                  autoComplete="off"
                  autoFocus={true}
                />
              </div>

              <div className={`input-container ${(userExists || isMailValid===false) && (formData.email) && 'warning'}  ${userExists===false && isValidEmail(formData.email) && 'success'}`}>
                <Mail style={{ width: "25px", height: "25px" }} />
                <input
                  type="email"
                  title="Enter Email"
                  onChange={(e) => handleChange(e)}
                  name="email"
                  placeholder="Email"
                  onBlur={checkEmail}
                  autoComplete="false"
                  required={true}
                />
              </div>

              <div
                className={`input-container password-field`}
                title="Enter Password"
              >
                <LockKeyhole style={{ width: "25px", height: "25px" }} />
                <input
                  type={showPasswordOne ? "text" : "password"}
                  onChange={(e) => handleChange(e)}
                  name="password"
                  placeholder="Password"
                  required={true}
                  autoComplete="false"
                />
                {!showPasswordOne ? (
                  <EyeOff
                    onClick={() => handlePasswordToggle(1)}
                    style={{ width: "25px", height: "25px" }}
                  />
                ) : (
                  <Eye
                    onClick={() => handlePasswordToggle(1)}
                    style={{ width: "25px", height: "25px" }}
                  />
                )}
              </div>

              <div className={`input-container password-field `}>
                <LockKeyhole style={{ width: "25px", height: "25px" }} />
                <input
                  type={showPasswordTwo ? "text" : "password"}
                  title="Enter Password Again"
                  name="matchPassword"
                  onChange={(e) => handleChange(e)}
                  placeholder="Password Again"
                  required={true}
                  autoComplete="false"
                />
                {!showPasswordTwo ? (
                  <EyeOff
                    onClick={() => handlePasswordToggle(2)}
                    style={{ width: "25px", height: "25px" }}
                  />
                ) : (
                  <Eye
                    onClick={() => handlePasswordToggle(2)}
                    style={{ width: "25px", height: "25px" }}
                  />
                )}
              </div>

              <h4>
                {passwordMismatch && formData.password && formData.matchPassword
                  ? "Passwords do not match. Please check again."
                  : ""}
              </h4>
              <h4>{userExists && formData.email ? "User already Exists! ":""}</h4>
              <h4>{isMailValid===false && 'Email is not Valid.'}</h4>

              <button className="btn sign-up-btn " type="submit">
                SIGN UP
              </button>
            </form>
            <a href="/login" title="Log In ">
              Already User? Log In
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
