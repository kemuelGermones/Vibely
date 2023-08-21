import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./stores/ModalContext";
import { AuthContextProvider } from "./stores/AuthContext";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
const appRoot = ReactDOM.createRoot(document.getElementById("app-root"));

appRoot.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ModalContextProvider>
          <ToastContainer />
          <App />
        </ModalContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
