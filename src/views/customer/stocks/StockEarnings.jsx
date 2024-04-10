import React from "react";
import dayjs from "dayjs";

import LineChart from "@components/common/charts/LineChart.jsx";

export default function StockEarnings({ data }) {
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

  return <LineChart options={initOptions} data={initData} />;
}
