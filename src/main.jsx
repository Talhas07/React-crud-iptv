import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Nav from "./layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <Nav /> */}
  </React.StrictMode>
);
