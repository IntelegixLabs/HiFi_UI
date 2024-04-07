import React from "react";
import dayjs from "dayjs";

import { autoFormatCurrencyInShortValues } from "@/GeneralHelpers.jsx";
import BarChart from "@components/common/charts/BarChart.jsx";

export default function BalanceSheetGraph({ data }) {
    let labels = [];
    let totalAssets = [];
    let totalLiabilities = [];

    data.annualReports.map((report) => {
      labels.push(dayjs(report.fiscalDateEnding).format('YYYY'));
      totalAssets.push(autoFormatCurrencyInShortValues(report.totalAssets));
      totalLiabilities.push(autoFormatCurrencyInShortValues(report.totalLiabilities));
    });

  const initOptions = {
    elements: {
      point: {
        radius: 0,
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
      },
      y: {
        grid: { display: false },
      },
    },
  };
  const initData = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Total Assets",
        data: totalAssets.reverse(),
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Total Liabilities",
        data: totalLiabilities.reverse(),
        backgroundColor: "rgb(255, 159, 64)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
    ],
  };

  return <BarChart options={initOptions} data={initData} />;
}
