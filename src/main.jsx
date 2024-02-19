import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloakConfig from "./keycloak-config.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider
    authClient={keycloakConfig}
    initOptions={{ onLoad: "login-required", checkLoginIframe: false }}
  >
    <RouterProvider router={router} />
  </ReactKeycloakProvider>
);
