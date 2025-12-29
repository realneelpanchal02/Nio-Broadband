import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Input_form = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon // 🔥 NEW PROP
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label fw-bold text-secondary">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}

      <div className="input-group">
        {/* ICON */}
        {icon && (
          <span className="input-group-text bg-light">
            <i className={ icon }></i>
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`form-control rounded-end ${
            error ? "is-invalid" : ""
          }`}
        />
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default Input_form;
