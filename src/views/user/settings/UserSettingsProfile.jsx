import { useEffect, useState, Fragment } from "react";

import { Api } from "@api/Api.jsx";

import IMG_USER_PROFILE from "@assets/profile_pic.png";

export default function UserSettingsProfile() {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // PAN Card Image
  const [PANImage, setPANImage] = useState(null);
  const [PANImagePreview, setPANImagePreview] = useState(null);
  const [PANImageFileName, setPANImageFileName] = useState("");
  const [PANImageFileSize, setPANImageFileSize] = useState(0);
  const [isPANUploading, setIsPANUploading] = useState(false);
  const [isPANDataAvailable, setIsPANDataAvailable] = useState({});
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    async function fetchInitialData() {
      await Api.get("user_profile/get_user_data")
        .then((response) => {
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log(error);
        });

      await Api.get("/userProfile/get_profile")
        .then((response) => {
          setPhoneNumber(response.data.phoneNumber);
          setUserId(response.data.userId);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchInitialData();
  }, []);

  const handleGeneralDetails = (e) => {
    e.preventDefault();

    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    }

    if (e.target.name === "lastName") {
      setLastName(e.target.value);
    }

    if (e.target.name === "email") {
      setEmail(e.target.value);
    }

    if (e.target.name === "phoneNumber") {
      setPhoneNumber(e.target.value);
    }

    return;
  };

  const handlePANImageUpload = (e) => {
    if(e.target.files[0].size > 2000000) {
      alert("File size must be less than 2MB");
      return;
    }

    setPANImage(e.target.files[0]);
    setPANImageFileName(e.target.files[0].name);
    setPANImageFileSize(e.target.files[0].size);
    setPANImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const removePANImage = () => {
    setPANImage(null);
    setPANImageFileName("");
    setPANImageFileSize(0);
    setPANImagePreview(null);
  };

  const handleSubmitPAN = async (e) => {
    e.preventDefault();

    setIsPANUploading(true);

    let formData = new FormData();
    formData.append("file", PANImage);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await Api.post("/kyc/upload_extract_pan_data", formData, config)
      .then((res) => {
        setIsPANDataAvailable(res.data);
        setIsPANUploading(false);
      })
      .catch((err) => {
        setIsPANUploading(false);
      });
  };

  const updateGeneralDetails = () => {
    const payload = {
      phoneNumber: phoneNumber,
    };

    Api.put(`/userProfile/update_profile/${userId}`, payload).then(
      (response) => {
        console.log("Updated!");
      }
    );
  };

  return (
    <Fragment>
      <div className="my-4 w-full flex items-center justify-between gap-6">
        <div>
          <h4 className="text-sm font-bold">Change your profile photo</h4>
          <p className="mt-1 text-sm text-gray-500">
            Update your profile photo with your
          </p>
        </div>
        <button className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md">
          Upload picture
        </button>
      </div>

      <hr className="my-6 border-gray-100" />

      <h4 className="font-semibold text-lg">General Details</h4>
      <div className="mt-2 flex flex-col gap-6">
        <div className="mt-2 flex gap-4">
          <div className="w-1/2 flex flex-col">
            <label htmlFor="first_name" className="text-xs font-semibold">
              First Name:
            </label>
            <input
              id="first_name"
              className="mt-2 py-2 pr-2 text-sm border-b focus:border-gray-400 outline-none duration-200"
              name="firstName"
              type="text"
              value={firstName}
              onChange={handleGeneralDetails}
              placeholder="First Name"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <label htmlFor="last_name" className="text-xs font-semibold">
              Last Name:
            </label>
            <input
              id="last_name"
              className="mt-2 py-2 pr-2 text-sm border-b focus:border-gray-400 outline-none duration-200"
              name="lastName"
              type="text"
              value={lastName}
              onChange={handleGeneralDetails}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="mt-2 flex gap-4">
          <div className="w-1/2 flex flex-col">
            <label htmlFor="email" className="text-xs font-semibold">
              Email:
            </label>
            <input
              id="email"
              className="mt-2 py-2 pr-2 text-sm border-b focus:border-gray-400 outline-none duration-200"
              name="email"
              type="text"
              value={email}
              onChange={handleGeneralDetails}
              placeholder="Email"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <label htmlFor="phone_number" className="text-xs font-semibold">
              Phone number:
            </label>
            <input
              id="phone_number"
              className="mt-2 py-2 pr-2 text-sm border-b focus:border-gray-400 outline-none duration-200"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handleGeneralDetails}
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className="flex flex-row-reverse items-start">
          <button
            className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md"
            onClick={updateGeneralDetails}
          >
            Update details
          </button>
        </div>
      </div>

      <hr className="my-6 border-gray-100" />

      <h4 className="font-semibold text-lg">Know your customer (KYC)</h4>

      <h6 className="mt-4 font-semibold text-md">PAN Card</h6>
      {PANImagePreview ? (
        <div className="my-2 p-3 flex border border-gray-200 border-dashed gap-4 rounded-md">
          <img src={PANImagePreview} className="w-40" alt="PAN Image Preview" />
          <div className="w-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h6 className="text-sm">{PANImageFileName}</h6>
                <p className="mt-1 text-sm text-gray-400">
                  {(PANImageFileSize / 1024).toFixed(2) + " KB"}
                </p>
              </div>
              {!isPANUploading && (
                <div className="flex gap-2">
                  <button
                    className="py-1.5 px-2 text-sm font-semibold text-red-400  hover:text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-md"
                    onClick={removePANImage}
                  >
                    <i className="fa-solid fa-times fa-fw"></i>
                  </button>
                  <button
                    className="py-1.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md"
                    onClick={handleSubmitPAN}
                  >
                    <i className="fa-solid fa-upload"></i> Upload
                  </button>
                </div>
              )}
              {isPANUploading && (
                <div className="flex gap-2">
                  <p
                    className="py-1.5 text-sm font-semibold text-gray-500 rounded-md"
                    disabled="true"
                  >
                    <i className="fa-solid fa-circle-notch fa-fw fa-spin"></i>{" "}
                    Upload in progress ...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="my-2 flex items-center justify-center w-full">
          <label
            htmlFor="pan-card"
            className="flex flex-col items-center justify-center w-full h-40 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-2 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">JPG or PNG, upto 2 MB</p>
            </div>
            <input
              id="pan-card"
              className="hidden"
              type="file"
              onChange={(e) => handlePANImageUpload(e)}
            />
          </label>
        </div>
      )}
    </Fragment>
  );
}
