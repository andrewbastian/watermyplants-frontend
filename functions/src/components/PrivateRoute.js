import React from "react";
import { Route, Redirect } from "react-router-dom";
import { hasToken } from "./../utils/token";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      hasToken ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
