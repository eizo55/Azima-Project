import React from "react";
import "../Styles/inputText.css";

export const InputDesc = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  defaultValue,
  isTextArea = false,
  required,
}) => {
  return (
    <div className="input-text">
      <label htmlFor="input">{label}</label>
      {isTextArea ? (
        <textarea
          className="desc textarea"
          rows={7}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
          required={required}
        />
      ) : (
        <input
          className="desc"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
};
