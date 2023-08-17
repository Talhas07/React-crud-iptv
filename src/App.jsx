// You can see that we are using `BrowserRouter`, `Routes` and `Route` from the `react-router-dom` library.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Navigate } from "react-router-dom";

import Register from "./Registration";
import Login from "./login";
import Series from "./series";
import Episodes from "./episodes";
import Seasons from "./seasons";
import Streams from "./streams";
import Genre from "./genres";
import Nav from "./layout";
import Notfound from "./Notfound";

// Now let's move to routing part.

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};
const LoginRedirect = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/" /> : children;
};
function App() {
  const layoutWrapper = (component) => {
    return (
      <PrivateRoute>
        <Nav page={component} />
      </PrivateRoute>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route
            path="/login"
            element={
              <LoginRedirect>
                {" "}
                <Login />{" "}
              </LoginRedirect>
            }
          />
          <Route
            path="/register"
            element={
              <LoginRedirect>
                <Register />
              </LoginRedirect>
            }
          />
          <Route path="/series" element={layoutWrapper(<Series />)} />
          <Route path="/episodes" element={layoutWrapper(<Episodes />)} />
          <Route path="/seasons" element={layoutWrapper(<Seasons />)} />
          <Route path="/" element={layoutWrapper(<Streams />)} />
          <Route path="/genres" element={layoutWrapper(<Genre />)} />
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
