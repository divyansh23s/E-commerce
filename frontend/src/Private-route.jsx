import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useApp } from "./context/AppContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useApp();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
