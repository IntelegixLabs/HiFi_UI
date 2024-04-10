import React from "react";

import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function LineChart({ options, data }) {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
