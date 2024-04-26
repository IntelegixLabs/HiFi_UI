import { Fragment, useEffect } from "react";
import { Api } from "@api/Api.jsx";

import CommodityStockTicker from "@views/customer/ticker/CommodityStockTicker";
import CompanyStockTicker from "@views/customer/ticker/CompanyStockTicker";

import IMG_APPLE_LOGO from "@/assets/img/apple_logo.png";
import IMG_META_LOGO from "@/assets/img/meta_logo.png";
import IMG_MICROSOFT_LOGO from "@/assets/img/microsoft_logo.png";
import IMG_GOOGLE_LOGO from "@/assets/img/google_logo.png";

import LineChart from "@components/common/charts/LineChart.jsx";

export default function Home() {
  function generateNDays(n) {
    const data = [];
    for (let i = 0; i < n; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push(
        date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
    }
    return data;
  }

  function generateRandomData(n) {
    const data = [];
    for (let i = 0; i < n; i++) {
      data.push(Math.round(Math.random() * 10));
    }
    return data;
  }
  function drawChart() {
    const data = {
      labels: generateNDays(7),
      datasets: [
        {
          label: "Active",
          data: generateRandomData(7),
          borderWidth: 1,
          fill: true,
          pointBackgroundColor: "rgb(59, 130, 246)",
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgb(59 130 246 / .05)",
          tension: 0.2,
        },
        {
          label: "Completed",
          data: generateRandomData(7),
          borderWidth: 1,
          fill: true,
          pointBackgroundColor: "rgb(16, 185, 129)",
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgb(16 185 129 / .05)",
          tension: 0.2,
        },
        {
          label: "Canceled",
          data: generateRandomData(7),
          borderWidth: 1,
          fill: true,
          pointBackgroundColor: "rgb(244, 63, 94)",
          borderColor: "rgb(244, 63, 94)",
          backgroundColor: "rgb(244 63 94 / .05)",
          tension: 0.2,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return <LineChart options={options} data={data} />
  }

  return (
    <div className="max-w-7xl mx-auto">
      <CommodityStockTicker />
      <CompanyStockTicker direction="right" />

      <div className="mt-10 grid grid-cols-4 gap-4">
        <div className="py-4 px-4 border shadow rounded-lg">
          <div className="flex space-x-4">
            <img className="w-12 h-12" src={IMG_APPLE_LOGO} alt="" />
            <div className="w-full">
              <p className="font-semibold text-lg">Apple</p>
              <div className="mt-1 text-sm flex justify-between">
                <span>Market Capitalization</span>
                <span>2.61T</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Total shares</span>
                <span>15.5B</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 px-4 border shadow rounded-lg">
          <div className="flex space-x-4">
            <img className="w-12 h-12" src={IMG_META_LOGO} alt="" />
            <div className="w-full">
              <p className="font-semibold text-lg">Meta</p>
              <div className="mt-1 text-sm flex justify-between">
                <span>Market Capitalization</span>
                <span>2.61T</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Total shares</span>
                <span>15.5B</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 px-4 border shadow rounded-lg">
          <div className="flex space-x-4">
            <img className="w-12 h-12" src={IMG_MICROSOFT_LOGO} alt="" />
            <div className="w-full">
              <p className="font-semibold text-lg">Microsoft</p>
              <div className="mt-1 text-sm flex justify-between">
                <span>Market Capitalization</span>
                <span>2.61T</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Total shares</span>
                <span>15.5B</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 px-4 border shadow rounded-lg">
          <div className="flex space-x-4">
            <img className="w-12 h-12" src={IMG_GOOGLE_LOGO} alt="" />
            <div className="w-full">
              <p className="font-semibold text-lg">Google</p>
              <div className="mt-1 text-sm flex justify-between">
                <span>Market Capitalization</span>
                <span>2.61T</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Total shares</span>
                <span>15.5B</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
          <div className="flex justify-between mb-4 items-start">
            <h4 className="font-semibold text-xl">Market Statistics</h4>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 hover:text-gray-600"
              >
                <i className="ri-more-fill"></i>
              </button>
              <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="rounded-md border border-dashed border-gray-200 p-4">
              <div className="flex items-center mb-0.5">
                <div className="text-xl font-semibold">10</div>
                <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
                  $80
                </span>
              </div>
              <span className="text-gray-400 text-sm">Active</span>
            </div>
            <div className="rounded-md border border-dashed border-gray-200 p-4">
              <div className="flex items-center mb-0.5">
                <div className="text-xl font-semibold">50</div>
                <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">
                  +$469
                </span>
              </div>
              <span className="text-gray-400 text-sm">Completed</span>
            </div>
            <div className="rounded-md border border-dashed border-gray-200 p-4">
              <div className="flex items-center mb-0.5">
                <div className="text-xl font-semibold">4</div>
                <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">
                  -$130
                </span>
              </div>
              <span className="text-gray-400 text-sm">Canceled</span>
            </div>
          </div>
          <div>
            { drawChart() }
          </div>
        </div>
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <h4 className="font-semibold text-xl">Earnings</h4>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 hover:text-gray-600"
              >
                <i className="ri-more-fill"></i>
              </button>
              <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px]">
              <thead>
                <tr>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                    Service
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Earning
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                        Buy / Sell
                      </a>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-emerald-500">
                      +$235
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                        Buy / Sell
                      </a>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-rose-500">
                      -$235
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                      Withdrawn
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                        Buy / Sell
                      </a>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-emerald-500">
                      +$235
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                        Buy / Sell
                      </a>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-rose-500">
                      -$235
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                      Withdrawn
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                        Buy / Sell
                      </a>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-emerald-500">
                      +$235
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
