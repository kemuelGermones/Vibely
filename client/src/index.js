import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./store/modal-context";
import { AuthContextProvider } from "./store/auth-context";

const queryClient = new QueryClient();
const appRoot = ReactDOM.createRoot(document.getElementById("app-root"));

appRoot.render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <ModalContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);
