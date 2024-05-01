import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import "./Styles/search.css";
import "./Styles/container.css";
import "./Styles/loader.css";
import "./Styles/card.css";
import "./Styles/productDetails.css";
import "./Styles/sidebar.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
