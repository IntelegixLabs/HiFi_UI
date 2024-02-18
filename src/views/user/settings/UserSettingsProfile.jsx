import { Fragment } from "react";
import IMG_USER_PROFILE from "@assets/profile_pic.png";

export default function UserSettingsProfile() {
  return (
    <Fragment>
      <div className="my-4 w-full flex items-center justify-between gap-6">
        <div>
          <h6 className="text-sm font-bold">Change your profile photo</h6>
          <p className="mt-1 text-sm text-gray-500">
            Update your profile photo with your
          </p>
        </div>
        <button className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md">
          Upload picture
        </button>
      </div>

      <hr className="my-6 border-gray-100" />

      <h6 className="font-semibold text-lg">General Details</h6>
      <div className="mt-2 flex flex-col gap-6">
        <div className="mt-2 flex gap-4">
          <div className="w-1/2 flex flex-col">
            <label htmlFor="first_name" className="text-xs font-semibold">
              First Name:
            </label>
            <input
              id="first_name"
              className="mt-2 py-2 pr-2 text-sm border-b focus:border-gray-400 outline-none duration-200"
              type="text"
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
              type="text"
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
              type="text"
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
              type="text"
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className="flex flex-row-reverse items-start">
          <button className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md">
            Update details
          </button>
        </div>
      </div>

      <hr className="my-6 border-gray-100" />

      <h6 className="font-semibold text-lg">Know your customer (KYC)</h6>
      <div className="my-2 px-2 py-10 border border-dashed border-gray-300 rounded">
        <p className="text-sm text-center text-gray-500">
          Upload your PAN card
        </p>
      </div>
    </Fragment>
  );
}
