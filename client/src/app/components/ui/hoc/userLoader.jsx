import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  getDataStatus,
  loadUsersList
} from "../../../store/usersSlice";
import Preloader from "../preloader/preloader";

const UsersLoader = ({ children }) => {
  const dataLoader = useSelector(getDataStatus());
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!dataLoader) {
      dispatch(loadUsersList());
    }
  }, [dataLoader]);
  if (!dataLoader) return <Preloader />;
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UsersLoader;
