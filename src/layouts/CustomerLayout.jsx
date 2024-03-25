import { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Api } from "@api/Api.jsx";
import Navbar from "@components/customer/Navbar.jsx";

export default function CustomerLayout() {
  const navigate = useNavigate();

  const [isCustomerExist, setCustomerExist] = useState(false);
  const [isProfileExist, setProfileExist] = useState(false);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    function initCustomerData() {
      setTimeout(() => {
        Api.get("/status/health").then((res) => {
          Api.get("/profile")
            .then((response) => {
              setCustomerExist(true);
              setCustomer(response.data);
            })
            .catch((error) => {
              setCustomerExist(false);
              navigate("/onboarding");
            });
        });
      }, 1000);
    }
    initCustomerData();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}
