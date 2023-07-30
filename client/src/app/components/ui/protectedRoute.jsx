import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import {
  // getCurrentUser,
  // getCurrentUserId,
  getIsLoggedIn
} from "../../store/usersSlice";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  // const currentUserId = useSelector(getCurrentUserId());
  // const currentUser = useSelector(getCurrentUser(currentUserId));

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (!isLoggedIn) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    form: props.location
                  }
                }}
              />
            );
          }

          return Component ? <Component {...props} /> : children;
        }}
      />
    </>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ProtectedRoute;
