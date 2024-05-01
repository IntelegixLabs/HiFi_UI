import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { Api } from "@api/Api.jsx";
import Navbar from "@components/customer/Navbar/Navbar.jsx";
import { UserProfileContext } from "../contexts/UserProfileContext";

export default function CustomerLayout() {
  const navigate = useNavigate();

  const [isCustomerProfileExist, setIsCustomerProfileExist] = useState(false);
  const [isCustomerProfileLoading, setIsCustomerProfileLoading] =
    useState(true);
  const [customer, setCustomer] = useState({});

  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState(null);

  useEffect(() => {
    function initCustomerData() {
      setTimeout(() => {
        Api.get("/status/health").then((res) => {
          Api.get("/profile")
            .then((response) => {
              setIsCustomerProfileExist(true);
              setIsCustomerProfileLoading(true);
              setCustomer(response.data);

              setPhoneNumber(response.data.phoneNumber);
              setGender(response.data.gender);
              setDOB(dayjs(response.data.dob, 'DD-MM-YYYY').format('YYYY-MM-DD'));
              setUserId(response.data.userId);

              console.log("Date time:", DOB);

              Api.get("/profile/1")
                .then((response) => {
                  setFirstName(response.data.first_name);
                  setLastName(response.data.last_name);
                  setEmail(response.data.email);
                })
                .catch((error) => {
                  console.log(error);
                });

              setIsCustomerProfileLoading(false);
            })
            .catch((error) => {
              setIsCustomerProfileExist(false);
              setIsCustomerProfileLoading(false);
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
        gender,
        DOB,
        isCustomerProfileExist,
        setFirstName,
        setLastName,
        setEmail,
        setPhoneNumber,
        setGender,
        setDOB,
      }}
    >
      <Navbar />
      <df-messenger
        project-id="hifi-420618"
        agent-id={import.meta.env.VITE_APP_DIALOGUE_FLOW_AGENT_ID}
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title=""></df-messenger-chat-bubble>
      </df-messenger>

      {isCustomerProfileLoading && <h1>Loading .... Please Wait...</h1>}

      {!isCustomerProfileLoading && <Outlet />}
    </UserProfileContext.Provider>
  );
}
