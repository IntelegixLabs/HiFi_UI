import { Fragment } from "react";
import { Link } from 'react-router-dom';

export default function UserSettingsPaymentSubscriptions() {
  return (
    <Fragment>
      <div className="mt-2 mb-4 px-4 py-3 border border-yellow-200 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 rounded-md">
        <h2 className="text-md font-semibold text-yellow-600">
          Valid till
        </h2>
        <p className="mt-1 text-sm text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-600">
          26 September 2024
        </p>
        {/* <button className="py-2 px-4 text-sm text-center font-semibold bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 border border-gray-300 hover:shadow-sm rounded-md">
          Go to AI Tools
          <i className="fa-solid fa-arrow-right fa-fw"></i>
        </button> */}
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
