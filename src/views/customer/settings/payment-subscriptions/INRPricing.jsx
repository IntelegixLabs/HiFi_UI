import { useState, Fragment } from "react";

import { Api } from "@api/Api.jsx";

export default function INRPricing() {
  const [pricings, setPricing] = useState([
    {
      name: "Yearly",
      price: 499,
      id: 1,
      currencyCode: "INR",
      discount: 10,
      description: "Yearly Subscription",
      createdAt: "2024-03-24 00:25:59.842318",
      duration: 365,
      isDeleted: false,
      updatedAt: "2024-03-24 00:25:59.842318",
    },
    {
      name: "Monthly",
      price: 49,
      id: 2,
      currencyCode: "INR",
      discount: 10,
      description: "Monthly Subscription",
      createdAt: "2024-03-24 00:25:59.842318",
      duration: 30,
      isDeleted: false,
      updatedAt: "2024-03-24 00:25:59.842318",
    },
  ]);


  const getPricing = () => {
    let allPricing = pricings.map((pricing) => {
      if (pricing.name === "Monthly") {
        return (
          <div
            key={pricing.id}
            className="w-1/2 mt-2 mb-4 px-4 py-3 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-md font-semibold text-blue-600">
                  {pricing.name}
                </h2>
                <p className="mt-1 text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">
                  {pricing.price} INR
                </p>
              </div>
              <button
                className="pt-0.5 pb-1 px-2 text-sm text-blue-500 hover:text-white bg-blue-50 hover:bg-blue-400 border border-blue-300 rounded duration-200"
                onClick={() => handlePurchase(pricing.id)}
              >
                buy <i className="fa-solid fa-arrow-right fa-fw"></i>
              </button>
            </div>
          </div>
        );
      }

      if (pricing.name === "Yearly") {
        return (
          <div
            key={pricing.id}
            className="w-1/2 mt-2 mb-4 px-4 py-3 bg-gradient-to-r from-orange-50 via-white to-orange-50 rounded-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-md font-semibold text-orange-600">
                  {pricing.name}
                </h2>
                <p className="mt-1 text-sm text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-600">
                  {pricing.price} INR
                </p>
              </div>
              <button
                className="pt-0.5 pb-1 px-2 text-sm text-orange-500 hover:text-white bg-orange-50 hover:bg-orange-400 border border-orange-300 rounded duration-200"
                onClick={() => handlePurchase(pricing.id)}
              >
                buy <i className="fa-solid fa-arrow-right fa-fw"></i>
              </button>
            </div>
          </div>
        );
      }
    });

    return <div className="flex gap-4">{allPricing}</div>;
  };

  const handlePurchase = (packageId) => {
    const payload = {
      id: packageId,
    };

    alert(packageId);
    // Api.post("/payments/stripe/create_payment_intent", payload).then(
    //   (response) => {
    //     alert("Purchase Complete");
    //   }
    // );
  };

  return <Fragment>{getPricing()}</Fragment>;
}
