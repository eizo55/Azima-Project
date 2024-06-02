import React from "react";
import "../Styles/inputText.css";

export const InputText = ({
  label,
  placeholder,
  thin,
  value,
  onChange,
  name,
  defaultValue,
  date,
  required,
  password,
  number,
}) => {
  return (
    <div className="input-text">
      <label htmlFor={name}>{label}</label>
      <input
        className={`text  ${thin && "inputThin"}`}
        type={
          date ? "date" : password ? "password" : number ? "number" : "text"
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
};
