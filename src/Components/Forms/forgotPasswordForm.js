import React, { useEffect, useState } from "react";
import PasswordField from "../Fields/passwordField";
import { useNavigate } from "react-router-dom";
import EmailField from "../Fields/emailField";

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email:'',
      password:'',
      confirmPassword:''
    })
    const [loading, setLoading] = useState(false);
    const [isMailLoading,setIsMailLoading] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState(null);
    const [isUserExist, setIsUserExist] = useState(null);

    useEffect(()=>{
      if(formData.password!==formData.confirmPassword){
        setIsPasswordMatch(false);
      }
      else{
        setIsPasswordMatch(true);
      }
      if(formData.password && checkPasswordValid(formData.password)){
        setIsPasswordValid(true);
      }
    },[formData]);

    const checkPasswordValid= (password) =>{
      if (password.length < 8) {
        return false;
      }
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      return alphanumericRegex.test(password);
    }

    const handleChange = (e)=>{
        setFormData(prevFormData=>({
          ...prevFormData,
          [e.target.name] : e.target.value
        }));
        if(e.target.name==='password'){
          setIsPasswordValid(false);
        }
    }

    const handleEmailSubmit=async(e)=>{
      e.preventDefault();
      setIsMailLoading(true);
      try{
        const response = await fetch(
          "https://mobiledbserver.onrender.com/api/users/find",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email
            })
          }
        );
        if(response.status===404){
          setIsUserExist(false);
          return;
        }
        else{
          setIsUserExist(true);
          setIsMailLoading(false);
          return;
        }

      }
      catch(err){
        console.error("Error during authentication:", err);
        alert("Error during authentication. Please try again.");
      }
      finally{
        setIsMailLoading(false);
      }
    }

    const handlePasswordSubmit = async(e)=>{
      e.preventDefault();
      if(!isPasswordMatch || !isPasswordValid) return;
      setLoading(true);
      try {
        const response = await fetch(
          "https://mobiledbserver.onrender.com/api/users/forgot-password",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            })
          }
        );
        if(response.status===200){
          navigate('/');
        }
      } catch (err) {
          console.log('Error in changing Password',err);
      }
      finally{
        setLoading(false);
      }
    }
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="forgot-password">
        <h1>FORGOT PASSWORD</h1>
          <form style={{display:`${!isUserExist? 'block':'none'}`}} onSubmit={handleEmailSubmit}>
              <EmailField
                className={isUserExist===false? 'warning':""}
                type="email"
                onChange={(e) => handleChange(e)}
                placeholder="Enter Email"
                name="email"
                isEmailLoading={isMailLoading}
                required
                autoFocus={!isUserExist? true:false}
              />

            <h4>{isUserExist === false ? "User does not Exists." : ""}</h4>
            <button className="btn" type="submit">
              Enter
            </button>
          </form>
          <form style={{display:`${isUserExist? 'block':'none'}`}} onSubmit={handlePasswordSubmit}>
            <PasswordField
              placeholder="Enter Password"
              onChange={(e) => handleChange(e)}
              required={true}
              name="password"
              autoFocus={isUserExist? true:false}
            />
            <PasswordField
              placeholder="Enter Password Again"
              onChange={(e) => handleChange(e)}
              required={true}
              name="confirmPassword"
            />
            <h4
            className={`fade-in ${isPasswordValid === false ? "" : "hidden"}`}
          >
            Password must contain 8 characters and be alphanumeric.
          </h4>
          <h4
            className={`fade-in ${
              isPasswordMatch===false && formData.password && formData.confirmPassword
                ? ""
                : "hidden"
            }`}
          >
            Password does not match.
          </h4>
            <button className="btn" type="submit">
              Enter
            </button>
          </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;