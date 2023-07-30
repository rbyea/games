import React from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

const SearchCatalog = ({ onChange, value, type, name }) => {
  const handleChange = ({ target }) => {
    const { value } = target;
    onChange({
      name,
      value: value
    });
  };

  return (
    <form className="filters-search mb-3">
      <div className="form-group">
        <i className="feather-search">
          <FaSearch />
        </i>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-control"
          placeholder="Поиск"
        />
      </div>
    </form>
  );
};

SearchCatalog.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string
};

export default SearchCatalog;
