import React from "react";

const Long_text = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label fw-semibold">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}

      <textarea
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      ></textarea>
    </div>  
  );
};

export default Long_text;
