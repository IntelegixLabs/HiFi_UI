import { Fragment, useEffect } from "react";
import { Api } from "@api/Api.jsx";

import CommodityStockTicker from "@views/customer/ticker/CommodityStockTicker";
import CompanyStockTicker from "@views/customer/ticker/CompanyStockTicker";

import IMG_APPLE_LOGO from "@/assets/img/apple_logo.png";
import IMG_META_LOGO from "@/assets/img/meta_logo.png";
import IMG_MICROSOFT_LOGO from "@/assets/img/microsoft_logo.png";
import IMG_GOOGLE_LOGO from "@/assets/img/google_logo.png";

export default function Home() {
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

    </div>
  );
}
