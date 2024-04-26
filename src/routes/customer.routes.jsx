import { Navigate } from "react-router-dom";

import Layout from "@layouts/CustomerLayout.jsx";
import Onboarding from "@views/customer/Onboarding.jsx";
import Home from "@views/customer/Home.jsx";
import Stocks from "@views/customer/Stocks.jsx";
import Cryptocurrency from "@views/customer/Cryptocurrency.jsx";

import Settings from "@views/customer/settings/Settings.jsx";
import SettingsProfile from "@views/customer/settings/SettingsProfile.jsx";
import SettingsPaymentSubscriptions from "@views/customer/settings/SettingsPaymentSubscriptions.jsx";

import InvestorPersonality from "@/views/customer/InvestorPersonality.jsx";
import SIPCalculator from "@views/customer/tools/SIPCalculator.jsx";
import RetirementCalculator from "@views/customer/tools/RetirementCalculator.jsx";

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
        path: "/cryptocurrency",
        name: "CustomerCryptocurrency",
        element: <Cryptocurrency />,
      },
      {
        path: "/investor-personality",
        name: "CustomerInvestorPersonality",
        element: <InvestorPersonality />,
      },
      {
        path: "/tools/sip-calculator",
        name: "CustomerSIPCalculator",
        element: <SIPCalculator />,
      },
      {
        path: "/tools/retirement-calculator",
        name: "CustomerRetirementCalculator",
        element: <RetirementCalculator />,
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
