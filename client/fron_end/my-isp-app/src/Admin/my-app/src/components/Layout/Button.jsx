import React from "react";

const Button = ({
  text,
  type = "button",
  onClick,
  className = "btn btn-success",
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {text}
    </button>
  );
};

export default Button;
