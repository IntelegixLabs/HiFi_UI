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
import { Pie } from "react-chartjs-2";

export default function PieChart({ options, data }) {
  return (
    <div>
      <Pie options={options} data={data} />
    </div>
  );
}
