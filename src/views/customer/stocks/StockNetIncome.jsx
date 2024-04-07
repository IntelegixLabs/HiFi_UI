import React from "react";
import dayjs from "dayjs";

import { autoFormatCurrencyInShortValues } from "@/GeneralHelpers.jsx";
import BarChart from "@components/common/charts/BarChart.jsx";

export default function StockNetIncome({ data }) {
  let labels = [];
  let netIncome = [];

  data.annualReports.map((report) => {
    labels.push(dayjs(report.fiscalDateEnding).format("YYYY"));
    netIncome.push(autoFormatCurrencyInShortValues(report.netIncome));
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
        label: "Net Income",
        data: netIncome.reverse(),
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  return <BarChart options={initOptions} data={initData} />;
}
