import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import PageTitle from "./components/PageTitle";

ReactDOM.render(
  <Provider store={Store}>
    <PageTitle title="VarsityWares" />
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
