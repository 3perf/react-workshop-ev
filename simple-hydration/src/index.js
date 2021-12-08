// Uncomment to enable why-did-you-render:
// import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "./app-wrapper";

const root = document.getElementById("root");
const isServerSideRenderingEnabled = root.innerHTML.trim().length > 0;
if (isServerSideRenderingEnabled) {
  ReactDOM.hydrate(<AppWrapper />, root);
} else {
  ReactDOM.render(<AppWrapper />, root);
}
