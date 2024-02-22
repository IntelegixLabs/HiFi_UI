// keycloak-config.js
import Keycloak from "keycloak-js";

let initOptions = {
  url: import.meta.env.VITE_APP_KEYCLOAK_URL,
  realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
  clientSecret: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_SECRET,
};

const keycloakConfig = new Keycloak(initOptions);

// keycloak.init({ onLoad: "check-sso" })
//    .then((auth) => {
//        console.log("Keycloak Authenticated:", auth);
//    })
//    .catch((error) => {
//        console.log("Keycloak Initialization Error", error);
//    });

export default keycloakConfig;
