import React from "react";
import dayjs from "dayjs";

import { autoFormatCurrencyInShortValues } from "@/GeneralHelpers.jsx";
import BarChart from "@components/common/charts/BarChart.jsx";

export default function StockFreeCashFlow({ data }) {
  let labels = [];
  let operatingCashFlow = [];
  let capitalExpenditures = [];
  let freeCashFlow = [];

  data.annualReports.map((report) => {
    labels.push(dayjs(report.fiscalDateEnding).format('YYYY'));
    operatingCashFlow.push(autoFormatCurrencyInShortValues(report.operatingCashflow));
    capitalExpenditures.push(autoFormatCurrencyInShortValues(report.capitalExpenditures));
    freeCashFlow.push(autoFormatCurrencyInShortValues(report.operatingCashflow - report.capitalExpenditures));
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
        label: "Free Cash Flow",
        data: freeCashFlow.reverse(),
        backgroundColor: "#55b623",
        borderColor: "#55b623",
        borderWidth: 1,
      },
      {
        label: "Operating Cash Flow",
        data: operatingCashFlow.reverse(),
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Capital Expenditures",
        data: capitalExpenditures.reverse(),
        backgroundColor: "rgb(255, 159, 64)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
    ],
  };

  return <BarChart options={initOptions} data={initData} />;
}
