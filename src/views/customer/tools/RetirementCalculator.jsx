import React, { useEffect, useState } from "react";
import LineChart from "@components/common/charts/LineChart.jsx";

export default function RetirementCalculator() {
  const [age, setAge] = useState(40);
  const [salary, setSalary] = useState(50000);
  const [investment, setInvestment] = useState(5);
  const [retirementAge, setRetirementAge] = useState(60);
  const [salaryIncrease, setSalaryIncrease] = useState(3);
  const [savingsRate, setSavingsRate] = useState(20);
  const [lifeSpan, setLifeSpan] = useState(80);
  const [retirementSpending, setRetirementSpending] = useState(40000);
  const [currentSavings, setCurrentSavings] = useState(20000);

  const [salarySaved, setSalarySaved] = useState(0);
  const [accumulatedSavings, setAccumulatedSavings] = useState(currentSavings);
  const [retiredAmount, setRetiredAmount] = useState(0);

  const [graphSavingsData, setGraphSavingsData] = useState([]);
  const [graphAgeData, setGraphAgeData] = useState([]);

  useEffect(() => {
    calculateRetirementSavings();
  }, [
    age,
    salary,
    investment,
    retirementAge,
    salaryIncrease,
    savingsRate,
    lifeSpan,
    retirementSpending,
    currentSavings,
  ]);

  function calculateRetirementSavings() {
    let currentAge = age;
    let yearsToRetirement = retirementAge - age;
    let totalYears = lifeSpan - age;

    let isRetired = yearsToRetirement > 0 ? false : true;

    let plotGraphAgeData = [];
    let plotGraphSavingsData = [];

    let currentYear = 0;

    for (currentYear = 0; currentYear <= totalYears; currentYear++) {
      plotGraphAgeData.push(currentAge);
      plotGraphSavingsData.push(accumulatedSavings);

      setAccumulatedSavings(prevSavings => prevSavings +
        Math.floor((accumulatedSavings / 100) * investment));

      if (currentYear === yearsToRetirement) {
        setRetiredAmount(accumulatedSavings);
      }

      if (isRetired) {
        setAccumulatedSavings(oldAccumulatedSavings => oldAccumulatedSavings - retirementSpending);
      } else {
        setSalarySaved(oldSalary => oldSalary + Math.floor((salarySaved / 100) * salaryIncrease));
        setAccumulatedSavings((oldAccumulatedSavings) => oldAccumulatedSavings + salarySaved);
      }

      currentAge++;
    }

    setGraphAgeData(plotGraphAgeData);
    setGraphSavingsData(plotGraphSavingsData);
  }

  function drawChart() {
    const data = {
      labels: graphAgeData,
      datasets: [
        {
          label: "Age money graph",
          data: graphSavingsData,
          fill: true,
          borderColor: "#0073d8",
          borderWidth: 2,
          backgroundColor: "#66abe840",
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };

    return <LineChart options={options} data={data} />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <p className="mt-4 text-sm text-gray-500">
        Tools <i className="fa-solid fa-angle-right fa-sm fa-fw"></i>
      </p>
      <h2 className="mt-1 text-2xl font-bold mb-4">Retirement Calculator</h2>
      <div className="mt-10 flex gap-20">
        <div className="w-4/5">{drawChart()}</div>
        <div className="w-1/5">
          <p>{retiredAmount}</p>
          <p>{accumulatedSavings}</p>
        </div>
      </div>
      <div className="my-20 grid grid-cols-3 gap-10">
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Age:
          </label>
          <input
            type="range"
            min="1"
            max="120"
            step="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">{age}</output>
        </div>
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Salary:
          </label>
          <input
            type="range"
            min="10000"
            max="100000"
            step="500"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">
            {salary}
          </output>
        </div>
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Investment return:
          </label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">
            {investment}%
          </output>
        </div>
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Retirement age:
          </label>
          <input
            type="range"
            min="50"
            max="100"
            step="1"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">
            {retirementAge} years
          </output>
        </div>
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Salary increase / year:
          </label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={salaryIncrease}
            onChange={(e) => setSalaryIncrease(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">
            {salaryIncrease} %
          </output>
        </div>
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Savings rate:
          </label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={savingsRate}
            onChange={(e) => setSavingsRate(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">
            {savingsRate}%
          </output>
        </div>
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Life span:
          </label>
          <input
            type="range"
            min="1"
            max="120"
            step="1"
            value={lifeSpan}
            onChange={(e) => setLifeSpan(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">
            {lifeSpan} years
          </output>
        </div>
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Retirement spending:
          </label>
          <input
            type="range"
            min="10000"
            max="100000"
            step="500"
            value={retirementSpending}
            onChange={(e) => setRetirementSpending(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">
            {retirementSpending}
          </output>
        </div>
        <div>
          <label
            htmlFor="monthlyInvestment"
            className="block text-lg font-medium text-gray-700"
          >
            Current savings:
          </label>
          <input
            type="range"
            min="10000"
            max="100000"
            step="500"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            className="mt-1 range-slider appearance-none w-full bg-gray-200 h-2 rounded-lg focus:outline-none"
          />
          <output className="text-lg font-semibold text-gray-500">
            {currentSavings}
          </output>
        </div>
      </div>
    </div>
  );
}
