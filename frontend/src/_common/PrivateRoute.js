import React from "react";
import { Redirect, Route } from "react-router-dom";
import LoginStatusUtility from "./LoginStatusUtility";

function PrivateRoute({ children, ...rest }) {
  function getRenderComponent({ location }) {
    if (LoginStatusUtility.isLoggedIn()) {
      return children;
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              referrerLocation: location,
            },
          }}
        />
      );
    }
  }
  return <Route {...rest} render={getRenderComponent} />;
}

export default PrivateRoute;
