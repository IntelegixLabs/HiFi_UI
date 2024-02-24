import { Outlet, Link, useLocation } from "react-router-dom";

import IMG_USER_PROFILE from "@assets/profile_pic.png";

export default function UserSettings() {
  const location = useLocation();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="my-10 flex gap-8">
          <div className="w-2/6 pr-4 border-r">
            <div className="sticky top-20">
              <div className="flex gap-2">
                <div className="w-2/6">
                  <img
                    className="w-28 h-28"
                    src={IMG_USER_PROFILE}
                    alt="user-profile-img"
                  />
                </div>
                <div className="w-4/6">
                  <h1 className="font-bold text-xl">Sayan Sinha</h1>
                  <div className="mt-1 text-sm flex justify-between text-gray-700 bg-gradient-to-r from-yellow-50 via-white to-yellow-50">
                    <p className="text-xs text-yellow-600">
                      <i className="fa-solid fa-check-circle fa-fw"></i> Your
                      subscription is active
                    </p>
                  </div>
                  <p className="mt-4 text-lg text-gray-600 font-bold">
                    <i className="fa-brands fa-ethereum fa-fw"></i> 220 ETH
                  </p>
                </div>
              </div>

              <hr className="mt-8 mb-2 border-gray-100" />

              <p className="text-sm font-medium text-green-600">
                <i className="fa-solid fa-check-circle fa-fw"></i> Wallet
                connected
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-gray-500 break-all">
                  0xb794f5ea0ba39494ce839613fffba74279579268
                </p>
                <button className="w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full">
                  <i className="fa-solid fa-copy fa-fw"></i>
                </button>
              </div>

              <hr className="my-2 border-gray-100" />

              <p className="text-sm font-medium text-green-600">
                <i className="fa-solid fa-lock fa-fw"></i> Account secured
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Secured via blockchain
              </p>

              <hr className="my-4 border-gray-100" />

              <div className="my-4 flex items-center justify-between">
                <div>
                  <h2 className="text-md font-semibold">Connect wallet</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Connect your ethereum wallet
                  </p>
                </div>
                <button className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md">
                  Connect
                </button>
              </div>

              <hr className="my-4 border-gray-100" />

              <div className="my-4 flex items-center justify-between">
                <div>
                  <h2 className="text-md font-semibold">Secure account</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Secure your account via blockchain
                  </p>
                </div>
                <button className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md">
                  Secure account
                </button>
              </div>
            </div>
          </div>
          <div className="w-4/6">
            <div className="sticky top-[56px] bg-white shadow-sm border-b border-gray-200">
              <nav className="-mb-px flex gap-2" aria-label="Tabs">
                <Link
                  to="/settings/profile"
                  className={`px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    location.pathname === "/settings/profile"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Profile details
                </Link>
                <Link
                  className={`px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    location.pathname === "/settings/tab-2"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Payment & Subscriptions
                </Link>
              </nav>
            </div>
            <div className="my-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
