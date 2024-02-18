import { createBrowserRouter, Navigate } from "react-router-dom";

import UserLayout from "@layouts/UserLayout.jsx";
import UserHome from "@views/user/UserHome.jsx";
import UserSettings from "@/views/user/settings/UserSettings.jsx";
import UserSettingsProfile from "@views/user/settings/UserSettingsProfile.jsx";
import UserSettingsCrypto from "@views/user/settings/UserSettingsCrypto.jsx";
import Error404 from "@views/Error404.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    name: "UserLayout",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        name: "UserHome",
        element: <UserHome />,
      },
      {
        path: "/settings",
        name: "UserSettings",
        element: <UserSettings />,
        children: [
          {
            path: "/settings",
            name: "UserSettingsHome",
            element: <Navigate to="/settings/profile" />,
          },
          {
            path: "/settings/profile",
            name: "UserSettingsProfile",
            element: <UserSettingsProfile />,
          },
          {
            path: "/settings/crypto",
            name: "UserSettingsCrypto",
            element: <UserSettingsCrypto />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
