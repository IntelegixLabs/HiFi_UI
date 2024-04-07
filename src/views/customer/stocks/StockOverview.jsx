import React, { Fragment } from 'react'
import ReadMoreTruncate from "@components/common/ReadMoreTruncate.jsx";

import { autoFormatCurrency } from "@/GeneralHelpers.jsx";

export default function StockOverview({ data }) {
  return (
    <Fragment>
      <h4 className="font-semibold text-2xl">Profile</h4>
      <div className="my-4">
        <div className="font-mono">
          <ReadMoreTruncate text={data.Description} maxLength={180} />
        </div>

        <div className="mt-6 text-gray-500 text-xs text-center flex items-start gap-2">
          <div className="px-4 py-1 border rounded-full">
            {data.AssetType}
          </div>
          <div className="px-4 py-1 border rounded-full">
            {data.Exchange}
          </div>
          <div className="px-4 py-1 border rounded-full">
            {data.Currency}
          </div>
          <div className="px-4 py-1 border rounded-full">
            {data.Country}
          </div>
        </div>
        <div className="mt-2 text-gray-500 text-xs text-center flex items-start gap-2">
          <div className="px-4 py-1 border rounded-full">
            {data.Sector}
          </div>
          <div className="px-4 py-1 border rounded-full">
            {data.Industry}
          </div>
        </div>
      </div>

      <h6 className="mt-10 font-semibold text-lg">Key Stats</h6>
      <div className="my-4 flex gap-4">
        <div className="w-1/2">
          <div className="p-2 font-mono bg-gray-50">
            <p className="mb-4 text-gray-500">Growth (FY)</p>
            <div className="my-2 text-sm flex items-center justify-between">
              <p>Revenue</p>
              <p>{autoFormatCurrency(data.RevenueTTM)}</p>
            </div>
            <hr className="border-gray-300" />
            <div className="my-2 text-sm flex items-center justify-between">
              <p>Revenue Per Share</p>
              <p>{data.RevenuePerShareTTM} %</p>
            </div>
            <hr className="border-gray-300" />
            <div className="my-2 text-sm flex items-center justify-between">
              <p>Revenue Per Share</p>
              <p>{data.RevenuePerShareTTM} %</p>
            </div>
            <hr className="border-gray-300" />
            <div className="my-2 text-sm flex items-center justify-between">
              <p>EPS</p>
              <p>{data.EPS} %</p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="p-2 font-mono bg-gray-50">
            <p className="mb-4 text-gray-500">Profitability (FY)</p>
            <div className="my-2 text-sm flex items-center justify-between">
              <p>Operating Margin</p>
              <p>{data.OperatingMarginTTM} %</p>
            </div>
            <hr className="border-gray-300" />
            <div className="my-2 text-sm flex items-center justify-between">
              <p>Profit Margin</p>
              <p>{data.ProfitMargin}</p>
            </div>
            <hr className="border-gray-300" />
            <div className="my-2 text-sm flex items-center justify-between">
              <p>Return on Equity</p>
              <p>{data.ReturnOnEquityTTM} %</p>
            </div>
            <hr className="border-gray-300" />
            <div className="my-2 text-sm flex items-center justify-between">
              <p>Return on Assets</p>
              <p>{data.ReturnOnAssetsTTM} %</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
