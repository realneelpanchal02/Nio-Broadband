import React from "react";

const DoB = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  touched
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label fw-semibold">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}

      <input
        type="date"
        className={`form-control ${
          touched && error ? "is-invalid" : touched ? "is-valid" : ""
        }`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />

      {touched && error && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

export default DoB;
