import React from "react";

const Drop_Doun = ({
  label,
  name,
  value,
  onChange,
  options = [],
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

      <select
        className={`form-select ${
          touched && error ? "is-invalid" : touched ? "is-valid" : ""
        }`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">-- Select --</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {touched && error && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

export default Drop_Doun;
