import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@components/users/Navbar.jsx";

export default function UserLayout(props) {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}
