import { Fragment, useContext, useEffect, useState } from "react";
import { Api } from "@api/Api.jsx";

import dayjs from "dayjs";

import "react-phone-number-input/style.css";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";

import { UserProfileContext } from "@contexts/UserProfileContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const {
    phoneNumber,
    gender,
    DOB,
    isCustomerProfileExist,
    setPhoneNumber,
    setGender,
    setDOB,
  } = useContext(UserProfileContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isCustomerProfileExist) {
      navigate("/");
    }
  }, []);

  const handleSubmit = () => {
    const payload = {
      phoneNumber: formatPhoneNumberIntl(phoneNumber),
      gender: gender,
      dob: dayjs(DOB).format("DD-MM-YYYY"),
    };

    Api.post("/profile", payload).then((response) => {
      navigate("/");
    });
  };

  return (
    <Fragment>
      <div className="max-w-xl mx-auto">
        <h2 className="mt-6 text-2xl font-bold">Welcome</h2>
        <p className="text-gray-500">
          Before you get started, let's setup your account.
        </p>

        <div className="mt-10 flex flex-col">
          <h6 className="text-base font-semibold">Phone number:</h6>
          <PhoneInput
            defaultCountry="IN"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>

        <div className="mt-10 flex flex-col">
          <h6 className="text-base font-semibold">Gender:</h6>
          <div className="mt-2 flex space-x-4">
            <div>
              <input
                name="gender"
                type="radio"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Male"}
              />{" "}
              Male
            </div>
            <div>
              <input
                name="gender"
                type="radio"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Female"}
              />{" "}
              Female
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <h6 className="text-base font-semibold">Date of birth:</h6>
          <input
            id="dob"
            name="dob"
            className="mt-2 border-b focus:border-gray-400 outline-none duration-200"
            type="date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
          />
        </div>

        <div className="mt-6 flex flex-col-reverse">
          <button
            className="px-2 py-3 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
}
