import { Fragment, useState } from "react";
import { Api } from "@api/Api.jsx";

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
      setDob(value);
    }

    return;
  };

  const handleSubmit = async () => {
    const payload = {
      phoneNumber: phoneNumber,
      gender: gender,
      dob: dob,
    };

    await Api.post("/profile").then((response) => {
      navigate("/");
    });
  };

  return (
    <Fragment>
      <div>Onboarding User</div>
      <input
        name="phone_number"
        type="text"
        placeholder="Phone number"
        onChange={(e) => handleChange(e)}
      />
      <label>Gender</label>
      <input
        name="gender"
        type="radio"
        value="Male"
        onChange={(e) => handleChange(e)}
      />{" "}
      Male
      <input
        name="gender"
        type="radio"
        value="Female"
        onChange={(e) => handleChange(e)}
      />{" "}
      Female
      <label htmlFor="dob">Date of birth:</label>
      <input
        id="dob"
        name="dob"
        type="date"
        onChange={(e) => handleChange(e)}
      />
      <button className="p-2 text-white bg-blue-400" onClick={handleSubmit}>
        Submit
      </button>
    </Fragment>
  );
}
