import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./stores/AuthContext";
import { SocketContextProvider } from "./stores/SocketContext";
import { ModalContextProvider } from "./stores/ModalContext";

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
