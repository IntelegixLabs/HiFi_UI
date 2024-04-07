import React, { Fragment, useEffect, useRef, useState } from "react";
import { ColorType, createChart } from "lightweight-charts";

import { transform } from "@/GeneralHelpers.jsx";

export default function StockFinancials({ Intraday, Daily, Weekly, Monthly }) {
  const chartContainer = useRef();

  const [isGraphLoading, setIsGraphLoading] = useState(true);

  useEffect(() => {
    drawChart(Monthly);
    setIsGraphLoading(false);
  });

  function drawChart(plotData) {
    let initialData = transform(plotData);

    // setIsGraphLoading(true);

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

    candlestickSeries.setData(initialData.monthly_time_series);

    return () => {
      chart.remove();
    };

  }

  return (
    <Fragment>
        <div
          ref={chartContainer}
          className={`my-10`}
        ></div>
    </Fragment>
  );
}
