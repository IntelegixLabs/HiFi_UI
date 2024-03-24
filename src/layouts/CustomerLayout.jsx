import { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Api } from "@api/Api.jsx";
import Navbar from "@components/customer/Navbar.jsx";

export default function CustomerLayout() {
  const navigate = useNavigate();

  // const [isCustomerExist, setCustomerExist] = useState(false);
  // const [isProfileExist, setProfileExist] = useState(false);
  // const [customer, setCustomer] = useState({});

  // useEffect(() => {
  //   async function initCustomerData() {
  //     await Api.get('/profile').then(response => {
  //       setCustomerExist(true);
  //       setCustomer(response.data);
  //     }).catch(error => {
  //       setCustomerExist(false);
  //       navigate('/onboarding');
  //     });
  //   }
  //   initCustomerData();
  // }, []);

  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}
