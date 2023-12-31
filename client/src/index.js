import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./stores/AuthContext";
import { ModalContextProvider } from "./stores/ModalContext";
import { SocketContextProvider } from "./stores/SocketContext";

const appRoot = ReactDOM.createRoot(document.getElementById("app-root"));

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message, { theme: "colored" });
    },
  }),
});

appRoot.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <ModalContextProvider>
            <ToastContainer />
            <App />
          </ModalContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
