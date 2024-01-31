import { User } from "lucide-react";
import React, { useState } from "react";
import { activeStyle, defaultStyle } from "./fieldStyle";


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
          onChange={props.onChange}
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
