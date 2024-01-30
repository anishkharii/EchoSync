import { User } from "lucide-react";
import React, { useState } from "react";

const defaultStyle = {
    border: "1px solid #ddd" 
  }
  const activeStyle = {
    border: "1px solid #3498db",
    boxShadow: "0 0 5px rgba(52, 152, 219, 0.5)"
  }

const TextField = (props) => {
    const [inputStyle, setInputStyle] = useState(undefined);
  return (
    <>
      <div className={`input-container `} style={inputStyle || defaultStyle }>
        <User style={{ width: "25px", height: "25px" }} />
        <input
          type="text"
          name={props.name}
          title={props.title}
          placeholder={props.placeholder}
          required={props.required}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          onFocus={()=>{
            setInputStyle(activeStyle)
            }}
          onBlur={()=>{
            setInputStyle(undefined)
            }}
        />
      </div>
    </>
  );
};

export default TextField;
