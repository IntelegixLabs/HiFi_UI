import { Navigate } from "react-router-dom";

import Layout from "@layouts/CustomerLayout.jsx";
import Onboarding from "@views/customer/Onboarding.jsx";
import Home from "@views/customer/Home.jsx";
import Stocks from "@views/customer/Stocks.jsx";
import Settings from "@views/customer/settings/Settings.jsx";
import SettingsProfile from "@views/customer/settings/SettingsProfile.jsx";
import SettingsPaymentSubscriptions from "@views/customer/settings/SettingsPaymentSubscriptions.jsx";

export default [
  {
    path: "/",
    name: "CustomerLayout",
    element: <Layout />,
    children: [
      // {
      //   path:"/",
      //   name:"CustomerRoot",
      //   element: <Navigate to="/home" replace />,
      // },
      {
        path: "/",
        name: "CustomerHome",
        element: <Home />,
      },
      {
        path: "/onboarding",
        name: "CustomerOnboarding",
        element: <Onboarding />,
      },
      {
        path: "/stocks",
        name: "CustomerStocks",
        element: <Stocks />,
      },
      {
        path: "/settings",
        name: "CustomerSettings",
        element: <Settings />,
        children: [
          {
            path: "/settings",
            name: "CustomerSettingsHome",
            element: <Navigate to="/settings/profile" />,
          },
          {
            path: "/settings/profile",
            name: "CustomerSettingsProfile",
            element: <SettingsProfile />,
          },
          {
            path: "/settings/payment-subscriptions",
            name: "CustomerSettingsPaymentSubscriptions",
            element: <SettingsPaymentSubscriptions />,
          },
        ],
      },
    ],
  },
];
