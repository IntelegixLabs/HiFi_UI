import React, { useEffect, useRef, useState } from "react";
import { ColorType, createChart } from "lightweight-charts";
import { transform } from "@/GeneralHelpers.jsx";

export default function TimeSeriesDailyGraph({ plotData }) {
  const chartContainer = useRef();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    drawChart(plotData);
  });

  function drawChart(paramsData) {
    let initialData = transform(paramsData, 'daily');

    setIsLoading((prevLoading) => {
      return true;
    });

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

    candlestickSeries.setData(initialData.daily_time_series);

    setIsLoading((prevLoading) => {
      return false;
    });

    return () => {
      chart.remove();
    };
  }

  return <div ref={chartContainer} className={`my-10`}></div>;
}
