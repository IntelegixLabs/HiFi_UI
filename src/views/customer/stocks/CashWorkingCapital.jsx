import React from "react";
import dayjs from "dayjs";

import { autoFormatCurrencyInShortValues } from "@/GeneralHelpers.jsx";
import BarChart from "@components/common/charts/BarChart.jsx";

export default function CashWorkingCapital({ data }) {
  let labels = [];
  let cash = [];
  let workingCapital = [];

  data.annualReports.map((report) => {
    labels.push(dayjs(report.fiscalDateEnding).format("YYYY"));
    cash.push(
      autoFormatCurrencyInShortValues(
        report.cashAndCashEquivalentsAtCarryingValue
      )
    );
    workingCapital.push(
      autoFormatCurrencyInShortValues(
        report.totalCurrentAssets - report.totalCurrentLiabilities
      )
    );
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
        label: "Cash",
        data: cash.reverse(),
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Working Capital",
        data: workingCapital.reverse(),
        backgroundColor: "rgb(255, 159, 64)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
    ],
  };

  return <BarChart options={initOptions} data={initData} />;
}
