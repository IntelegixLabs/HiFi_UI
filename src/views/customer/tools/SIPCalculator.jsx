import React, { useEffect, useState } from "react";
import DoughnutChart from "@components/common/charts/DoughnutChart";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    calculateSIP();
    drawChart();
  }, [monthlyInvestment, expectedReturnRate, timePeriod]);

  const calculateSIP = () => {
    const i = expectedReturnRate / 100 / 12;
    const n = timePeriod * 12;
    const maturityAmount = parseInt(
      monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
    ).toFixed(0);

    let newInvestedAmount = monthlyInvestment * 12 * timePeriod;
    let newEstimatedReturns = maturityAmount - newInvestedAmount;

    setInvestedAmount(newInvestedAmount);
    setEstimatedReturns(newEstimatedReturns);
    setTotalAmount(maturityAmount);
  };

  const calculateLumsum = () => {
    const i = expectedReturnRate / 100 / 12;
    const n = timePeriod * 12;
    const maturityAmount = parseInt(
      monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
    ).toFixed(0);

    let newInvestedAmount = monthlyInvestment * 12 * timePeriod;
    let newEstimatedReturns = maturityAmount - newInvestedAmount;

    setInvestedAmount(newInvestedAmount);
    setEstimatedReturns(newEstimatedReturns);
    setTotalAmount(maturityAmount);
  };

  const drawChart = () => {
    const data = {
      labels: ["Invested", "Returns"],
      datasets: [
        {
          data: [investedAmount, estimatedReturns],
          backgroundColor: ["#cdf4fc", "#07c8ef"],
          borderColor: ["#07c8ef40"],
          borderWidth: 1,
        },
      ],
    };

    return <DoughnutChart data={data} />;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <p className="mt-4 text-sm text-gray-500">
        Tools <i className="fa-solid fa-angle-right fa-sm fa-fw"></i>
      </p>
      <h2 className="mt-1 text-2xl font-bold mb-4">SIP Calculator</h2>
      <div className="mt-6 p-10 flex gap-20 border rounded-lg">
        <div className="w-3/5">
          <div className="mb-4">
            <label
              htmlFor="monthlyInvestment"
              className="block text-lg font-medium text-gray-700"
            >
              Monthly Investment:
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
              className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
            />
            <output className="text-lg font-semibold text-gray-500">
              {monthlyInvestment}
            </output>
          </div>
          <div className="my-10">
            <label
              htmlFor="expectedReturnRate"
              className="block text-lg font-medium text-gray-700"
            >
              Expected Return Rate (% per annum):
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(parseInt(e.target.value))}
              className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
            />
            <output className="text-lg text-gray-500">
              {expectedReturnRate}%
            </output>
          </div>
          <div className="my-10">
            <label
              htmlFor="timePeriod"
              className="block text-lg font-medium text-gray-700"
            >
              Time Period (Years):
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(parseInt(e.target.value))}
              className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
            />
            <output className="text-lg text-gray-500">
              {timePeriod === 1 ? timePeriod + " year" : timePeriod + " years"}
            </output>
          </div>

          <div className="mt-20 mb-4">
            <div className="my-2 flex justify-between">
              <p className="text-base">Total amount invested:</p>
              <p>
                <i className="fa-solid fa-indian-rupee-sign fa-fw text-gray-500"></i>
                {investedAmount}
              </p>
            </div>
            <hr className="border-gray-200" />
            <div className="my-2 flex justify-between">
              <p className="text-base">Estimated returns:</p>
              <p>
                <i className="fa-solid fa-indian-rupee-sign fa-fw text-gray-500"></i>
                {estimatedReturns}
              </p>
            </div>
            <hr className="border-gray-200" />
            <div className="my-2 flex justify-between">
              <p className="text-base">Total:</p>
              <p>
                <i className="fa-solid fa-indian-rupee-sign fa-fw text-gray-500"></i>
                {totalAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/5">{drawChart()}</div>
      </div>

      <div className="mt-10 mb-10 md:w-1/2">
        <h4 className="mt-10 text-xl font-bold">
          How do SIP calculators work??
        </h4>
        <p className="mt-2 text-gray-500">
          A SIP plan calculator works on the following formula -
        </p>
        <p className="my-4 p-4 text-xl text-center bg-gray-50 rounded-lg">
          M = P * (((1 + i)<sup>n</sup> - 1) / i) * (1 + i)
        </p>
        <p>In the above formula -</p>
        <ul className="list-disc list-inside">
          <li>M is the amount you receive upon maturity</li>
          <li>P is the amount you invest at regular intervals</li>
          <li>n is the number of payments you have made</li>
          <li>i is the periodic rate of interest</li>
        </ul>
        <p className="mt-6">
          Take for example you want to invest Rs. 1,000 per month for 12 months
          at a periodic rate of interest of 12%,
          <br />
          then the monthly rate of return will be 12%/12 = 1/100=0.01.
          <br />
          Hence, M = 1000 * (((1 +0.01 )<sup>12</sup>) - 1) / 0.01) * (1 + 0.01),
          <br />
          which gives Rs 12,809 Rs approximately in a year.
        </p>
        <p className="mt-4">
          The rate of interest on a SIP will differ as per market conditions. It
          may increase or decrease, which will change the estimated returns.
        </p>
      </div>
    </div>
  );
}
