import React from "react";
import PropTypes from "prop-types";

const InputField = ({
  error,
  type,
  title,
  value,
  onChange,
  name,
  placeholder
}) => {
  const handleChange = (value) => {
    onChange({ name, value: value });
  };

  return (
    <div className="form-group">
      {title && <label htmlFor={name}>{title}</label>}
      <input
        type={type}
        onChange={(e) => handleChange(e.target.value)}
        className={
          error
            ? "form-control is-invalid"
            : error === undefined
            ? "form-control"
            : "form-control is-valid"
        }
        id={name}
        value={value || ""}
        name={name}
        placeholder={placeholder}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

InputField.propTypes = {
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default InputField;
