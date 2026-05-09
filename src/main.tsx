import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";   // 👈 change here

const router = getRouter();             // 👈 create instance

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);