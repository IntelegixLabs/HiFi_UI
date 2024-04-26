import React from 'react';

import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart({ options, data }) {
  return (
    <div>
      <Doughnut options={options} data={data} />
    </div>
  );
}
