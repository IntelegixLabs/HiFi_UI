import React from "react";

import { TIME_SERIES_MONTHLY } from "@sample/STOCK_FUNCTION.jsx";

export default function Candlestick({ data, height = 240, width = 500 }) {
  const chartContainer = useRef();

  const drawChart = (plotData) => {
    let initialData = transform(plotData);

    const chart = createChart(chartContainer.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
      },
      width: chartContainer.current.clientWidth,
      height: height,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData(initialData.monthly_time_series);

    return () => {
      chart.remove();
    };
  };

  return (
    <Fragment>
      {isGraphLoading ? (
        <p className="w-full mt-20 mb-10 text-center text-gray-400 animate-pulse">
          Loading...Please wait...
        </p>
      ) : (
        <div ref={chartContainer}></div>
      )}
    </Fragment>
  );
}
