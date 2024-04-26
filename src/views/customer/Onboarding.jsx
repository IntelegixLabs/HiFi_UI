import { Fragment, useState } from "react";
import { Api } from "@api/Api.jsx";
import dayjs from "dayjs";

export default function Onboarding() {
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "phone_number") {
      setPhoneNumber(value);
    }

    if (name === "gender") {
      setGender(value);
    }

    if (name === "dob") {
      let formatDob = dayjs(value).format('DD-MM-YYYY');
      setDob(formatDob);
      console.log("Hello World:", formatDob);
    }

    return;
  };

  const handleSubmit = () => {
    const payload = {
      phoneNumber: phoneNumber,
      gender: gender,
      dob: dob,
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
          <label htmlFor="phone_number">Phone number:</label>
          <input
            name="phone_number"
            className="mt-1 px-2 py-1 border rounded-lg"
            type="text"
            placeholder="Phone number"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-6 flex flex-col">
          <label>Gender</label>
          <div className="flex space-x-4">
            <div>
              <input
                name="gender"
                type="radio"
                value="Male"
                onChange={(e) => handleChange(e)}
              />{" "}
              Male
            </div>
            <div>
              <input
                name="gender"
                type="radio"
                value="Female"
                onChange={(e) => handleChange(e)}
              />{" "}
              Female
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <label htmlFor="dob">Date of birth:</label>
          <input
            id="dob"
            name="dob"
            className="mt-1 px-2 py-1 border rounded-lg"
            type="date"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mt-6 flex flex-col-reverse">
          <button className="px-2 py-3 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
}
