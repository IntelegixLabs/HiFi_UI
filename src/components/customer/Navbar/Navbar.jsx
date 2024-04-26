import React, { Fragment, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IMG_LOGO from "@/assets/img/logo.png";
import IMG_PROFILE from "@/assets/profile_pic.png";
import ExpandMenu from "@components/customer/Navbar/ExpandMenu.jsx";

import { UserProfileContext } from "@contexts/UserProfileContext.jsx";

export default function Navbar() {
    const { userId, firstName, lastName, email, phoneNumber } =
      useContext(UserProfileContext);

  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  }

  return (
    <Fragment>
      <nav className="sticky top-0 border-b py-2.5 bg-white/80 backdrop-blur-sm z-50">
        {/* Large screen */}
        <div className="hidden max-w-7xl mx-auto lg:flex">
          <div className="flex items-center space-x-10">
            <Link to="/">
              <img className="w-28" src={IMG_LOGO} alt="logo" />
            </Link>
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className={`text-base px-4 py-1.5 rounded-lg ${
                  location.pathname === "/"
                    ? "text-black bg-gray-100"
                    : "hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/stocks"
                className={`text-base px-4 py-1.5 rounded-lg ${
                  location.pathname === "/stocks"
                    ? "text-black bg-gray-100"
                    : "hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Stocks
              </Link>
              <Link
                to="/cryptocurrency"
                className={`text-base px-4 py-1.5 rounded-lg ${
                  location.pathname === "/cryptocurrency"
                    ? "text-black bg-gray-100"
                    : "hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Cryptocurrency
              </Link>
              <div className="relative inline-block text-left dropdown">
                <span className="rounded-md">
                  <button
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-5 transition duration-200 ease-in-out hover:text-gray-800 focus:outline-none focus:bg-gray-100 focus:text-black rounded-lg"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="true"
                    aria-controls="headlessui-menu-items-117"
                  >
                    <span>Tools</span>
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </span>
                <div className="opacity-0 invisible dropdown-menu transition-all duration-200 transform origin-top-right -translate-y-2 scale-95">
                  <div
                    className="absolute w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    aria-labelledby="headlessui-menu-button-1"
                    id="headlessui-menu-items-117"
                    role="menu"
                  >
                    <div className="py-0">
                      <Link
                        to="/tools/sip-calculator"
                        tabIndex="0"
                        className="text-gray-700 hover:bg-gray-50 hover:text-black flex justify-between w-full px-4 py-2 text-sm leading-5 text-left rounded-t-md"
                        role="menuitem"
                      >
                        SIP Calculator
                      </Link>
                      <Link
                        to="/tools/retirement-calculator"
                        tabIndex="0"
                        className="text-gray-700 hover:bg-gray-50 hover:text-black flex justify-between w-full px-4 py-2 text-sm leading-5 text-left rounded-b-md"
                        role="menuitem"
                      >
                        Retirement Calculator
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="relative inline-block text-left dropdown">
                <span className="rounded-md">
                  <button
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-5 transition duration-200 ease-in-out hover:text-gray-800 focus:outline-none focus:bg-gray-100 focus:text-black rounded-lg"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="true"
                    aria-controls="headlessui-menu-items-117"
                  >
                    <span>Tools</span>
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </span>
                <div className="opacity-0 invisible dropdown-menu transition-all duration-200 transform origin-top-right -translate-y-2 scale-95">
                  <div
                    className="absolute w-[512px] mt-2 p-2 origin-top-right grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-gray-200 rounded-lg shadow-lg outline-none"
                    aria-labelledby="headlessui-menu-button-1"
                    id="headlessui-menu-items-117"
                    role="menu"
                  >
                    <a
                      className="flex flex-row space-x-2 items-start rounded-lg bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      href="#"
                    >
                      <div className="bg-teal-500 text-white rounded-lg p-4">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className="md:h-6 md:w-6 h-4 w-4"
                        >
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">SIP Calculator</p>
                        <p className="text-xs">
                          Calculate your SIP and see your corpus
                        </p>
                      </div>
                    </a>
                    <a
                      className="flex flex-row space-x-2 items-start rounded-lg bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      href="#"
                    >
                      <div className="bg-teal-500 text-white rounded-lg p-4">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className="md:h-6 md:w-6 h-4 w-4"
                        >
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">SIP Calculator</p>
                        <p className="text-xs">
                          Calculate your SIP and see your corpus
                        </p>
                      </div>
                    </a>
                    <a
                      className="flex flex-row space-x-2 items-start rounded-lg bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      href="#"
                    >
                      <div className="bg-teal-500 text-white rounded-lg p-4">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className="md:h-6 md:w-6 h-4 w-4"
                        >
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">SIP Calculator</p>
                        <p className="text-xs">
                          Calculate your SIP and see your corpus
                        </p>
                      </div>
                    </a>
                    <a
                      className="flex flex-row space-x-2 items-start rounded-lg bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      href="#"
                    >
                      <div className="bg-teal-500 text-white rounded-lg p-4">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className="md:h-6 md:w-6 h-4 w-4"
                        >
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">SIP Calculator</p>
                        <p className="text-xs">
                          Calculate your SIP and see your corpus
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="ml-auto relative inline-block text-left dropdown">
            <span className="rounded-md">
              <button
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-800 focus:outline-none focus:bg-gray-100 focus:text-black rounded-lg"
                type="button"
                aria-haspopup="true"
                aria-expanded="true"
                aria-controls="headlessui-menu-items-117"
              >
                <span>Profile</span>
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </span>
            <div className="opacity-0 invisible dropdown-menu transition-all duration-200 transform origin-top-right -translate-y-2 scale-95">
              <div
                className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                aria-labelledby="headlessui-menu-button-1"
                id="headlessui-menu-items-117"
                role="menu"
              >
                <div className="px-4 py-2">
                  <p className="font-semibold text-sm leading-5 text-gray-800">
                    {firstName} {lastName}
                  </p>
                  <p className="text-xs leading-5 text-gray-600 truncate">
                    {email}
                  </p>
                </div>
                <div className="py-0">
                  <Link
                    to="/settings"
                    tabIndex="0"
                    className="text-gray-700 hover:bg-gray-50 hover:text-black flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/investor-personality"
                    tabIndex="0"
                    className="text-gray-700 hover:bg-gray-50 hover:text-black flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                  >
                    Investor's Personality
                  </Link>
                  <span
                    role="menuitem"
                    tabIndex="-1"
                    className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                    aria-disabled="true"
                  >
                    New feature (soon)
                  </span>
                </div>
                <div>
                  <Link
                    to="/"
                    tabIndex="3"
                    className="text-gray-700 hover:bg-gray-50 rounded-b-lg hover:text-black flex justify-between w-full px-4 py-2.5 text-sm leading-5 text-left"
                    role="menuitem"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile screen */}
        <div className="lg:hidden flex items-center justify-between px-3 py-0.5">
          <Link to="/">
            <img className="w-24" src={IMG_LOGO} alt="logo" />
          </Link>
          <button onClick={toggleSidebar}>
            <i className="fa-solid fa-bars fa-fw"></i>
          </button>
        </div>

        {/* Mobile screen sidebar */}
        {/* Mobile screen backdrop */}
        <div
          className={`lg:hidden fixed top-0 h-screen w-screen -z-10 bg-black/20 duration-300 opacity-0 ease-in-out ${
            isSidebarOpen ? "opacity-100" : "hidden"
          }`}
          onClick={toggleSidebar}
        ></div>
        <div
          className={`fixed top-0 w-[320px] h-screen bg-red-100 overflow-hidden duration-200 flex flex-col ${
            isSidebarOpen ? "left-0" : "-left-[320px]"
          }`}
        >
          <div className="sticky top-0 p-3 border-b bg-white">
            <Link to="/">
              <img className="w-24" src={IMG_LOGO} alt="logo" />
            </Link>
          </div>
          <div className="h-full py-2 px-3 bg-white border-r border-gray-200 space-y-1 overflow-y-auto flex flex-col">
            <Link
              className="w-full text-sm md:text-base px-2 py-2 bg-gray-50 hover:bg-gray-100 hover:text-black rounded-lg"
              to="/"
            >
              Dashboard
            </Link>
            <Link
              className="w-full text-sm md:text-base px-2 py-2 bg-gray-50 hover:bg-gray-100 hover:text-black rounded-lg"
              to="/stocks"
            >
              Stocks
            </Link>
            <Link
              className="w-full text-sm md:text-base px-2 py-2 bg-gray-50 hover:bg-gray-100 hover:text-black rounded-lg"
              to="/cryptocurrency"
            >
              Cryptocurrency
            </Link>
            <ExpandMenu labelName="Tools">
              <Link
                className="w-full text-sm md:text-base px-2 py-2 bg-gray-50 hover:bg-gray-100 hover:text-black rounded-lg"
                to="/tools/sip-calculator"
              >
                SIP Calculator
              </Link>
              <Link
                className="w-full text-sm md:text-base px-2 py-2 bg-gray-50 hover:bg-gray-100 hover:text-black rounded-lg"
                to="/tools/retirement-calculator"
              >
                Retirement Calculator
              </Link>
            </ExpandMenu>
          </div>
          <div className="sticky bottom-0 border-t flex items-center bg-white space-x-2 px-3 py-2">
            <img className="w-10" src={IMG_PROFILE} alt="profile-pic" />
            <div>
              <h6 className="text-sm font-semibold">Sayan Sinha</h6>
              <p className="text-xs">sayansinha5@gmail.com</p>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
