import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ title, name, link }) => {
  return (
    <Link to={link} className={`btn ${name}`}>
      {title}
    </Link>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string
};

export default Button;
