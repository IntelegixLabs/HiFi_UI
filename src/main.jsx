import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloakConfig from "./keycloak-config.jsx";

import { AppConfigContext } from "@contexts/AppConfigContext.jsx";

import "./index.css";

const APP_ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider
    authClient={keycloakConfig}
    initOptions={{ onLoad: "login-required", checkLoginIframe: false }}
  >
    <AppConfigContext.Provider value={{ APP_ENVIRONMENT }}>
      <RouterProvider router={router} />
    </AppConfigContext.Provider>
  </ReactKeycloakProvider>
);
