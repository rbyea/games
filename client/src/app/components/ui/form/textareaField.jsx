import React from "react";
import PropTypes from "prop-types";

const TextareaField = ({ error, value, onChange, title, name, rows }) => {
  const handleChange = (value) => {
    onChange({ name, value: value });
  };

  return (
    <div className="form-group">
      {title && <label htmlFor={name}>{title}</label>}
      <textarea
        className={
          error
            ? "form-control is-invalid"
            : error === undefined
            ? "form-control"
            : "form-control is-valid"
        }
        id={name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        rows={rows || 1}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextareaField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.string,
  error: PropTypes.string,
  title: PropTypes.string
};

export default TextareaField;
