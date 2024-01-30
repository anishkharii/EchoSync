import { Mail } from 'lucide-react';
import React, { useState } from 'react'

const defaultStyle = {
    border: "1px solid #ddd" 
  }
  const activeStyle = {
    border: "1px solid #3498db",
    boxShadow: "0 0 5px rgba(52, 152, 219, 0.5)"
  }

const EmailField = (props)=>{

    const [inputStyle, setInputStyle] = useState(undefined);


    return(
        <>
             <div
            className={`input-container ${props.className} `} style={inputStyle || defaultStyle}
          >
            <Mail style={{ width: "25px", height: "25px" }} />
            <input
              type='email'
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
          </div>
        </>
    )
}

export default EmailField;