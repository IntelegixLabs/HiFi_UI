import React from 'react';

import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function BarChart({ data }) {
  return (
    <div>
      <Bar data={data} />
    </div>
  );
}
