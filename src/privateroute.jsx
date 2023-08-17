import React from "react";
import { Route } from "react-router-dom";

function PrivateRoute({ element, ...rest }) {
  const auth = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth) {
          // not logged in so redirect to login page with the return url
          window.location.replace("/login");
          return;
        }

        // authorized so return component
        return <Route element={element} {...props} />;
      }}
    />
  );
}
export default PrivateRoute;
