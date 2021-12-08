import React from "react";
import { Provider } from "react-redux";
import "./app-wrapper.css";
import App from "./components/App";
import store from "./store";

const AppWrapper = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export default AppWrapper;
