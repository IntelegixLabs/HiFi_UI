import { Fragment } from "react";

export default function UserSettingsProfile() {
  return (
    <Fragment>
      <div className="my-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Connect wallet</h2>
          <p className="mt-1 text-sm">Connect your ethereum wallet</p>
        </div>
        <button className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md">
          Connect
        </button>
      </div>

      <hr className="my-6 border-gray-100" />

      <div className="my-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Secure account</h2>
          <p className="mt-1 text-sm">Secure your account via blockchain</p>
        </div>
        <button className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md">
          Secure my account
        </button>
      </div>
    </Fragment>
  );
}
