import { Loader, Mail } from "lucide-react";
import React, { useState } from "react";
import { activeStyle, defaultStyle, successStyle, warningStyle } from "./fieldStyle";



const EmailField = (props) => {
  const [inputStyle, setInputStyle] = useState(undefined);

  return (
    <>
      <div
        className={`input-container email-field ${props.className} `}
        style={
          inputStyle ||
          (props.className
            ? props.className.includes("warning")
              ? warningStyle
              : props.className.includes("success")
              ? successStyle
              : defaultStyle
            : defaultStyle)
        }
      >
        <Mail style={{ width: "25px", height: "25px" }} />
        <input
          type="email"
          title={props.title}
          onChange={props.onChange}
          name={props.name}
          onBlur={() => {
            props.onBlur && props.onBlur();
            setInputStyle(undefined);
          }}
          onFocus={(e) => {
            props.onFocus && props.onFocus();
            setInputStyle(activeStyle);
          }}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          required={props.required}
          autoFocus={props.autoFocus}
        />
        <div className="email-loader">{props.isEmailLoading && <Loader />}</div>
      </div>
    </>
  );
};

export default EmailField;
