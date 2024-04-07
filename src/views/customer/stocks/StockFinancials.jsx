import React, { Fragment, useEffect, useRef, useState } from "react";
import { ColorType, createChart } from "lightweight-charts";

import { transform } from "@/GeneralHelpers.jsx";

export default function StockFinancials({ Intraday, Daily, Weekly, Monthly }) {
  const chartContainer = useRef();

  const [chartType, setChartType] = useState("monthly");

  useEffect(() => {
    drawChart(Monthly, chartType);
  }, []);

  function drawChart(plotData, type = "") {
    let initialData = transform(plotData, type);

    setChartType(type);

    const chart = createChart(chartContainer.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
      },
      width: chartContainer.current.clientWidth,
      height: 240,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    if (type === "intraday") {
      candlestickSeries.setData(initialData.intraday_time_series);
    } else if (type === "daily") {
      candlestickSeries.setData(initialData.daily_time_series);
    } else if (type === "weekly") {
      candlestickSeries.setData(initialData.weekly_time_series);
    } else {
      candlestickSeries.setData(initialData.monthly_time_series);
    }

    return () => {
      chart.remove();
    };
  }

  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="flex text-sm gap-1 rounded-lg">
          <button
            onClick={() => drawChart(Intraday, "intraday")}
            className={`${
              chartType === "intraday" ? "text-gray-600 bg-gray-100" : ""
            } py-1 px-2 rounded-lg`}
          >
            Intraday
          </button>
          <button
            onClick={() => drawChart(Daily, "daily")}
            className={`${
              chartType === "daily" ? "text-gray-600 bg-gray-100" : ""
            } py-1 px-2 rounded-lg`}
          >
            Daily
          </button>
          <button
            onClick={() => drawChart(Weekly, "weekly")}
            className={`${
              chartType === "weekly" ? "text-gray-600 bg-gray-100" : ""
            } py-1 px-2 rounded-lg`}
          >
            Weekly
          </button>
          <button
            onClick={() => drawChart(Monthly, "monthly")}
            className={`${
              chartType === "monthly" ? "text-gray-600 bg-gray-100" : ""
            } py-1 px-2 rounded-lg`}
          >
            Monthly
          </button>
        </div>
        <div ref={chartContainer} className={`my-10`}></div>
      </div>
    </Fragment>
  );
}
