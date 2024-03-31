import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { Api } from "@api/Api.jsx";
import INRPricing from "@views/customer/settings/payment-subscriptions/INRPricing.jsx";

export default function SettingsPaymentSubscriptions() {
  return (
    <Fragment>
      <div className="mt-2 mb-4 px-4 py-3 border border-yellow-200 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 rounded-md">
        <h2 className="text-md font-semibold text-yellow-600">Valid till</h2>
        <p className="mt-1 text-sm text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-600">
          26 September 2024
        </p>
        {/* <button className="py-2 px-4 text-sm text-center font-semibold bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 border border-gray-300 hover:shadow-sm rounded-md">
          Buy now
          <i className="fa-solid fa-arrow-right fa-fw"></i>
        </button> */}
      </div>

      <hr className="my-6 border-gray-100" />

      <INRPricing />

      <h4 className="mt-10 font-semibold text-lg">Purchase history</h4>
      <table className="mt-6 w-full text-sm text-left text-gray-500">
        <thead className="text-sm text-gray-600 border-b-2 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction Id
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <th scope="row" className="px-6 py-4 font-mono">
              werit9rw4875834i2ejfhjdjsf834
            </th>
            <td className="px-6 py-4">38th March 2024</td>
            <td className="px-6 py-4">Yearly</td>
            <td className="px-6 py-4">INR 499</td>
          </tr>
          <tr className="border-b">
            <th scope="row" className="px-6 py-4 font-mono">
              werit9rw4875834i2ejfhjdjsf834
            </th>
            <td className="px-6 py-4">38th March 2024</td>
            <td className="px-6 py-4">Yearly</td>
            <td className="px-6 py-4">INR 499</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}
