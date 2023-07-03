import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./store/modal-context";

const appRoot = ReactDOM.createRoot(document.getElementById("app-root"));

appRoot.render(
  <ModalContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ModalContextProvider>
);
