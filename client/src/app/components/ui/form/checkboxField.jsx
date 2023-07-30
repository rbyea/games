import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ error, value, onChange, children, name }) => {
  const handleChange = (e) => {
    onChange({ name: name, value: !value });
  };
  return (
    <div className="custom-control custom-checkbox">
      <input
        onChange={handleChange}
        checked={value || false}
        type="checkbox"
        className={
          error
            ? "custom-control-input is-invalid"
            : "custom-control-input is-valid"
        }
        id={name}
      />
      <label className="custom-control-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default CheckBoxField;
