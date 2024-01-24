import React, { useState, useEffect } from "react";
import { Eye, EyeOff, LockKeyhole, UserRound, Mail } from "lucide-react";
import "./input.css";

const Input = (props) => {
  const [showPassword, setShowPassword] = useState(true);
  const [focused, setFocused] = useState(false);

  const handleIcon = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFocus = () => {
    setFocused((prevState) => !prevState);
  };



  const getIconTitleAndValidity = () => {
    switch (props.type) {
      case "password":
        return { icon: <LockKeyhole />, title: "Password is Encrypted.",validity:"Password is Required." };
      case "email":
        return { icon: <Mail />, title: "Enter Email", validity:"Email is Required."};
      default:
        return { icon: <UserRound />, title: "Enter Username", validity:"Username is Required." };
    }
  };

  const { icon, title,validity } = getIconTitleAndValidity();

  return (
    <>
      <div
        className={`input-wrapper ${focused ? "focused" : ""}`}
      >
        <div className="icon" title={title}>
          {icon}
        </div>

        <input
          type={
            props.type === "password"
              ? showPassword
                ? "password"
                : "text"
              : props.type
          }
          placeholder={props.placeholder}
          name={props.name}
          onFocus={handleFocus}
          onBlur={handleFocus}
          onChange={props.onChange}
          autoFocus={props.autoFocus}
          onInvalid={e=> e.target.setCustomValidity(validity)}
          onInput={e=> e.target.setCustomValidity("")}
          required={props.required}
          autoComplete={props.autoComplete}
          autoCorrect={props.autoCorrect}
        />

        <div className="icon">
          {props.type === "password" && (
            <div
              className="icon"
              style={{ cursor: "pointer" }}
              title={showPassword ? "Show Password" : "Hide Password"}
              onClick={handleIcon}
            >
              {showPassword ? (
                <EyeOff className="eye" />
              ) : (
                <Eye className="eye" />
              )}
            </div>
          )}
        </div>
      </div>
      <br />
    </>
  );
};

export default Input;
