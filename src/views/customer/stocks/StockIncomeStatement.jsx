import React from "react";
import dayjs from "dayjs";

import { autoFormatCurrencyInShortValues } from "@/GeneralHelpers.jsx";
import BarChart from "@components/common/charts/BarChart.jsx";

export default function StockIncomeStatement({ data }) {
  let labels = [];
  let revenue = [];
  let operatingExpenses = [];

  data.annualReports.map((report) => {
    labels.push(dayjs(report.fiscalDateEnding).format("YYYY"));
    revenue.push(autoFormatCurrencyInShortValues(report.totalRevenue));
    operatingExpenses.push(
      autoFormatCurrencyInShortValues(report.operatingExpenses)
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
        display: false,
      },
      y: {
        grid: { display: false },
        position: "right"
      },
    },
  };
  const initData = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Revenue",
        data: revenue.reverse(),
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Operating Income",
        data: operatingExpenses.reverse(),
        backgroundColor: "rgb(255, 159, 64)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
    ],
  };

  return <BarChart options={initOptions} data={initData} />;
}
