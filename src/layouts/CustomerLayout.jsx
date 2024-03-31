import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Api } from "@api/Api.jsx";
import Navbar from "@components/customer/Navbar.jsx";
import { UserProfileContext } from "../contexts/UserProfileContext";

export default function CustomerLayout() {
  const navigate = useNavigate();

  const [isCustomerExist, setCustomerExist] = useState(false);
  const [isProfileExist, setProfileExist] = useState(false);
  const [customer, setCustomer] = useState({});

  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    function initCustomerData() {
      setTimeout(() => {
        Api.get("/status/health").then((res) => {
          Api.get("/profile")
            .then((response) => {
              setCustomerExist(true);
              setCustomer(response.data);

              setPhoneNumber(response.data.phoneNumber);
              setUserId(response.data.userId);

              Api.get("/profile/1")
                .then((response) => {
                  setFirstName(response.data.first_name);
                  setLastName(response.data.last_name);
                  setEmail(response.data.email);
                })
                .catch((error) => {
                  console.log(error);
                });
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
    <UserProfileContext.Provider
      value={{
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        setFirstName,
        setLastName,
        setEmail,
        setPhoneNumber,
      }}
    >
      <Navbar />
      <Outlet />
    </UserProfileContext.Provider>
  );
}
