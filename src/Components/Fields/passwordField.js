// PasswordField.js
import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const defaultStyle = {
  border: "1px solid #ddd" 
}
const activeStyle = {
  border: "1px solid #3498db",
  boxShadow: "0 0 5px rgba(52, 152, 219, 0.5)"
}

const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputStyle, setInputStyle] = useState(undefined);
  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="input-container password-field" style={inputStyle || defaultStyle}>
      <LockKeyhole style={{ width: "25px", height: "25px" }} />
      <input
        type={showPassword ? "text" : "password"}
        onChange={props.onChange}
        onBlur={()=>{
          props.onBlur || setInputStyle(undefined)
          }}
        onFocus={()=>{
          props.focus || setInputStyle(activeStyle)
        }}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        autoComplete="false"
      />
      {!showPassword ? (
        <EyeOff
          onClick={handlePasswordToggle}
          style={{ width: "25px", height: "25px", cursor: "pointer" }}
        />
      ) : (
        <Eye
          onClick={handlePasswordToggle}
          style={{ width: "25px", height: "25px", cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default PasswordField;
