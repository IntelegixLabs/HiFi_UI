import React, { Fragment } from "react";
import dayjs from "dayjs";
import { autoFormatCurrency } from "@/GeneralHelpers.jsx";

import LineChart from "@components/common/charts/LineChart.jsx";

export default function StockEarnings({ data, overview }) {
  let labels = [];
  let reportedEPS = [];

  data.annualEarnings.map((report) => {
    labels.push(dayjs(report.fiscalDateEnding).format("YYYY"));
    reportedEPS.push(report.reportedEPS);
  });

  const initOptions = {
    elements: {
      point: {
        radius: 2,
      },
    },
    plugins: {
      legend: {
        labels: {},
        align: "start",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        display: false,
      },
      y: {
        grid: { display: false },
        position: "right",
      },
    },
  };
  const initData = {
    labels: labels.reverse(),
    datasets: [
      {
        fill: true,
        label: "EPS",
        data: reportedEPS.reverse(),
        backgroundColor: "#55b62360",
        borderColor: "#55b623",
        borderWidth: 2,
        tension: 0
      },
    ],
  };

  return (
    <Fragment>
      <LineChart options={initOptions} data={initData} />

      <div className="my-10 text-xs flex flex-wrap items-start justify-center gap-2">
        <div className="px-2 py-1 border rounded-full">
          <span className="text-gray-500">Mkt. Cap: </span>
          <span className="font-medium">
            {autoFormatCurrency(overview.MarketCapitalization)}
          </span>
        </div>
        <div className="px-2 py-1 border rounded-full">
          <span className="text-gray-500">P/E: </span>
          <span className="font-medium">{overview.PERatio}</span>
        </div>
        <div className="px-2 py-1 border rounded-full">
          <span className="text-gray-500">PEG: </span>
          <span className="font-medium">{overview.PEGRatio}</span>
        </div>
        <div className="px-2 py-1 border rounded-full">
          <span className="text-gray-500">P/S: </span>
          <span className="font-medium">{overview.PriceToSalesRatioTTM}</span>
        </div>
        <div className="px-2 py-1 border rounded-full">
          <span className="text-gray-500">EBITDA: </span>
          <span className="font-medium">
            {autoFormatCurrency(overview.EBITDA)}
          </span>
        </div>
        <div className="px-2 py-1 border rounded-full">
          <span className="text-gray-500">P/B: </span>
          <span className="font-medium">{overview.PriceToBookRatio}</span>
        </div>
      </div>
    </Fragment>
  );
}
