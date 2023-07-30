import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, name, value, onChange, options, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClassName = () => {
    return error
      ? "form-control is-invalid"
      : error === undefined
      ? "form-control"
      : "form-control is-valid";
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={getInputClassName()}
      >
        <option value="" disabled>
          Выбрать
        </option>
        {optionsArray.length > 0 &&
          optionsArray.map((prof) => (
            <option
              name={prof.task}
              key={prof.value}
              value={prof.task ? prof.task : prof.value}
            >
              {prof.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SelectField;
