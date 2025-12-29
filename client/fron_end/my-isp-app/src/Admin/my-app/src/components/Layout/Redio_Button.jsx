import React from "react";

const  Redio_Button = ({
  label,
  name,
  value,
  checked,
  onChange,
  inline = false,
  required = false
}) => {
  return (
    <div className={`form-check ${inline ? "form-check-inline" : ""}`}>
      <input
        className="form-check-input"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
      />
      <label className="form-check-label">
        {label}
      </label>
    </div>
  );
};

export default Redio_Button;
