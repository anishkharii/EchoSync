import React, { useEffect, useState } from "react";
import { CircleUserRound, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import axios from "axios";
import "./logInForm.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWrongDetails, setIsWrongDetails] = useState(null);
  const [isMailValid, setIsMailValid] = useState(null);
  const navigate = useNavigate();

  const handlePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    if(!formData.email || !formData.password ){
      setIsWrongDetails(null);
    }

  },[formData])

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkValid = ()=>{
    if(isValidEmail(formData.email)){
      setIsMailValid(true);
      console.log(formData.email)
      return true;
    }
    else{
      setIsMailValid(false);
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://mobiledbserver.onrender.com/api/users/findAndVerify",
        {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            email:formData.email,
            password:formData.password
          })
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify({
          username:formData.username,
          email:formData.email
        }));
        navigate("/");
      } else {
        setIsWrongDetails(true);
      }
      
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Error during authentication. Please try again.");
      setLoading(false)
    }
    finally{
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

      <div className="login-container">
        <div className="left-container">
          <img src="../images/logInPageImage.jpeg" alt="login Page mage" />

          <p>
            <h2>Chat</h2>LIKE PRO
          </p>
        </div>
        <div className="right-container">
          <div className="login-form">
            <CircleUserRound
              style={{ width: "50px", height: "50px", margin: "10px" }}
            />
            <form onSubmit={handleSubmit}>
              <div className={`input-container ${(formData.email && isMailValid===false)? 'warning':'' }`}>
                <Mail style={{ width: "25px", height: "25px" }} />
                <input
                  type="email"
                  title="Enter Email"
                  onChange={(e) => handleChange(e)}
                  name="email"
                  onBlur={checkValid}
                  placeholder="Email"
                  autoComplete="off"
                  required={true}
                />
              </div>

              <div
                className={`input-container password-field`}
                title="Enter Password"
              >
                <LockKeyhole style={{ width: "25px", height: "25px" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => handleChange(e)}
                  name="password"
                  placeholder="Password"
                  required={true}
                  autoComplete="false"
                />
                {!showPassword ? (
                  <EyeOff
                    onClick={handlePassword}
                    style={{ width: "25px", height: "25px", cursor:'pointer'}}
                  />
                ) : (
                  <Eye
                    onClick={handlePassword}
                    style={{ width: "25px", height: "25px",cursor:'pointer' }}
                  />
                )}
              </div>

              
              <h4>
                {
                  isWrongDetails?"Email or Password is Wrong.":""
                }
              </h4>
              <h4>
                {(formData.email && isMailValid)===false? 'Email is not valid': ''}
              </h4>
              <button className="btn log-in-btn " type="submit">
                SIGN IN
              </button>
            </form>
            <a href="/add-user" title="Log In ">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
