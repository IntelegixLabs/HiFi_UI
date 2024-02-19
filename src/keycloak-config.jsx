// keycloak-config.js
import Keycloak from "keycloak-js";

const keycloakConfig = new Keycloak({
  url: import.meta.env.VITE_APP_KEYCLOAK_URL,
  realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
});

//const keycloak = new Keycloak(keycloakConfig);

//keycloak.init({ onLoad: "check-sso" })
//    .then((auth) => {
//        console.log("Keycloak Authenticated:", auth);
//    })
//    .catch((error) => {
//        console.log("Keycloak Initialization Error", error);
//    });

export default keycloakConfig;
