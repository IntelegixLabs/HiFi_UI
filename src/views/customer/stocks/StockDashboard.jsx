import React, { Fragment, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";

import { AppConfigContext } from "@contexts/AppConfigContext.jsx";
import ReadMoreTruncate from "@components/common/ReadMoreTruncate.jsx";

import { autoFormatCurrency } from "@/GeneralHelpers.jsx";
import BarChart from "@components/common/charts/BarChart.jsx";
import LineChart from "@components/common/charts/LineChart.jsx";

export default function StockDashboard({
  Overview,
  IncomeStatement,
  CashFlow,
  BalanceSheet,
  Earnings,
}) {
  const { APP_ENVIRONMENT } = useContext(AppConfigContext);

  const [OverviewData, setOverviewData] = useState({});
  const [IncomeStatementData, setIncomeStatementData] = useState({});
  const [CashFlowData, setCashFlowData] = useState({});
  const [NetIncomeData, setNetIncomeData] = useState({});
  const [GrossProfitOperatingExpenseData, setGrossProfitOperatingExpenseData] =
    useState({});
  const [CashAndWorkingCapitalData, setCashAndWorkingCapitalData] = useState(
    {}
  );
  const [BalanceSheetData, setBalanceSheetData] = useState({});
  const [EarningsData, setEarningsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState({
    plugins: { legend: { labels: { bottom: 4 }, align: "start" } },
  });

  useEffect(() => {
    setOverviewData(Overview);
    getIncomeStatement(IncomeStatement);
    getNetIncome(IncomeStatement);
    getCashFlow(CashFlow);
    getGrossProfitOperatingExpense(IncomeStatement);
    getCashAndWorkingCapital(BalanceSheet);
    getBalanceSheet(BalanceSheet);
    getEarnings(Earnings);
    setIsLoading(false);
  }, []);

  async function getEarnings(paramsData) {
    let newLabels = [];
    let newReportedEPS = [];
    let data = {};

    paramsData.annualEarnings.map((report) => {
      newLabels.push(dayjs(report.fiscalDateEnding).format("YYYY"));
      newReportedEPS.push(report.reportedEPS);
    });

    data = {
      labels: newLabels.reverse(),
      datasets: [
        {
          fill: true,
          label: "EPS",
          data: newReportedEPS.reverse(),
          backgroundColor: "#55b623",
          borderColor: "#55b623",
          borderWidth: 1,
        },
      ],
    };

    setEarningsData(data);
  }

  async function getIncomeStatement(paramsData) {
    let newLabels = [];
    let newRevenue = [];
    let newOperatingExpenses = [];
    let data = {};

    paramsData.annualReports.map((report) => {
      newLabels.push(report.fiscalDateEnding);
      newRevenue.push(report.totalRevenue);
      newOperatingExpenses.push(report.operatingExpenses);
    });

    data = {
      labels: newLabels,
      datasets: [
        {
          label: "Revenue",
          data: newRevenue,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
        {
          label: "Operating Income",
          data: newOperatingExpenses,
          backgroundColor: "rgb(255, 159, 64)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 1,
        },
      ],
    };

    setIncomeStatementData(data);
  }

  async function getNetIncome(paramsData) {
    let newLabels = [];
    let newNetIncome = [];
    let data = [];

    paramsData.annualReports.map((report) => {
      newLabels.push(report.fiscalDateEnding);
      newNetIncome.push(report.netIncome);
    });

    data = {
      labels: newLabels,
      datasets: [
        {
          label: "Net Income",
          data: newNetIncome,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
      ],
    };

    setNetIncomeData(data);
  }

  async function getCashFlow(paramsData) {
    let newLabels = [];
    let newOperatingCashFlow = [];
    let newCapitalExpenditure = [];
    let newFreeCashFlow = [];
    let data = [];

    paramsData.annualReports.map((report) => {
      newLabels.push(report.fiscalDateEnding);
      newOperatingCashFlow.push(report.operatingCashflow);
      newCapitalExpenditure.push(report.capitalExpenditures);
      newFreeCashFlow.push(
        report.operatingCashflow - report.capitalExpenditures
      );
    });

    data = {
      labels: newLabels,
      datasets: [
        {
          label: "Free Cash Flow",
          data: newFreeCashFlow,
          backgroundColor: "#55b623",
          borderColor: "#55b623",
          borderWidth: 1,
        },
        {
          label: "Operating Cash Flow",
          data: newOperatingCashFlow,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
        {
          label: "Capital Expenditures",
          data: newCapitalExpenditure,
          backgroundColor: "rgb(255, 159, 64)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 1,
        },
      ],
    };

    setCashFlowData(data);
  }

  async function getGrossProfitOperatingExpense(paramsData) {
    let newLabels = [];
    let newGrossProfit = [];
    let newOperatingExpenses = [];
    let data = {};

    paramsData.annualReports.map((report) => {
      newLabels.push(report.fiscalDateEnding);
      newGrossProfit.push(report.grossProfit);
      newOperatingExpenses.push(report.operatingExpenses);
    });

    data = {
      labels: newLabels,
      datasets: [
        {
          label: "Revenue",
          data: newGrossProfit,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
        {
          label: "Operating Income",
          data: newOperatingExpenses,
          backgroundColor: "rgb(255, 159, 64)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 1,
        },
      ],
    };

    setGrossProfitOperatingExpenseData(data);
  }

  async function getCashAndWorkingCapital(paramsData) {
    let newLabels = [];
    let newCash = [];
    let newWorkingCapital = [];
    let data = {};

    paramsData.annualReports.map((report) => {
      newLabels.push(report.fiscalDateEnding);
      newCash.push(report.grossProfit);
      newWorkingCapital.push(
        report.totalCurrentAssets - report.totalCurrentLiabilities
      );
    });

    data = {
      labels: newLabels,
      datasets: [
        {
          label: "Cash",
          data: newCash,
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
        {
          label: "Working Capital",
          data: newWorkingCapital,
          backgroundColor: "rgb(255, 159, 64)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 1,
        },
      ],
    };

    setCashAndWorkingCapitalData(data);
  }

  async function getBalanceSheet(paramsData) {
    let newLabels = [];
    let newTotalAssets = [];
    let newTotalLiabilities = [];
    let data = {};

    paramsData.annualReports.map((report) => {
      newLabels.push(report.fiscalDateEnding);
      newTotalAssets.push(report.totalAssets);
      newTotalLiabilities.push(report.totalLiabilities);
    });

    data = {
      labels: newLabels,
      datasets: [
        {
          label: "Cash",
          data: newTotalAssets,
          backgroundColor: "#55b623",
          borderColor: "#55b623",
          borderWidth: 1,
        },
        {
          label: "Working Capital",
          data: newTotalLiabilities,
          backgroundColor: "rgb(255, 159, 64)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 1,
        },
      ],
    };

    setBalanceSheetData(data);
  }

  return (
    <Fragment>
      {!isLoading && (
        <Fragment>
          <div className="my-10 flex gap-4">
            <div className="w-1/2 p-4 border rounded-lg">
              <h4 className="font-semibold text-2xl">Profile</h4>
              <div className="my-4">
                <div className="font-mono">
                  <ReadMoreTruncate
                    text={OverviewData.Description}
                    maxLength={180}
                  />
                </div>

                <div className="mt-6 text-gray-500 text-xs text-center flex items-start gap-2">
                  <div className="px-4 py-1 border rounded-full">
                    {OverviewData.AssetType}
                  </div>
                  <div className="px-4 py-1 border rounded-full">
                    {OverviewData.Exchange}
                  </div>
                  <div className="px-4 py-1 border rounded-full">
                    {OverviewData.Currency}
                  </div>
                  <div className="px-4 py-1 border rounded-full">
                    {OverviewData.Country}
                  </div>
                </div>
                <div className="mt-2 text-gray-500 text-xs text-center flex items-start gap-2">
                  <div className="px-4 py-1 border rounded-full">
                    {OverviewData.Sector}
                  </div>
                  <div className="px-4 py-1 border rounded-full">
                    {OverviewData.Industry}
                  </div>
                </div>
              </div>

              <h6 className="mt-10 font-semibold text-lg">Key Stats</h6>
              <div className="my-4 flex gap-4">
                <div className="w-1/2">
                  <div className="p-2 font-mono bg-gray-50">
                    <p className="mb-4 text-gray-500">Growth (FY)</p>
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Revenue</p>
                      <p>{autoFormatCurrency(OverviewData.RevenueTTM)}</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Revenue Per Share</p>
                      <p>{OverviewData.RevenuePerShareTTM} %</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Revenue Per Share</p>
                      <p>{OverviewData.RevenuePerShareTTM} %</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>EPS</p>
                      <p>{OverviewData.EPS} %</p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="p-2 font-mono bg-gray-50">
                    <p className="mb-4 text-gray-500">Profitability (FY)</p>
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Operating Margin</p>
                      <p>{OverviewData.OperatingMarginTTM} %</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Profit Margin</p>
                      <p>{OverviewData.ProfitMargin}</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Return on Equity</p>
                      <p>{OverviewData.ReturnOnEquityTTM} %</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Return on Assets</p>
                      <p>{OverviewData.ReturnOnAssetsTTM} %</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 p-4 border rounded-lg">
              <LineChart options={options} data={EarningsData} />

              <div className="my-10 text-xs flex flex-wrap items-start justify-center gap-2">
                <div className="px-2 py-1 border rounded-full">
                  <span className="text-gray-500">Mkt. Cap: </span>
                  <span className="font-medium">
                    {autoFormatCurrency(OverviewData.MarketCapitalization)}
                  </span>
                </div>
                <div className="px-2 py-1 border rounded-full">
                  <span className="text-gray-500">P/E: </span>
                  <span className="font-medium">{OverviewData.PERatio}</span>
                </div>
                <div className="px-2 py-1 border rounded-full">
                  <span className="text-gray-500">PEG: </span>
                  <span className="font-medium">{OverviewData.PEGRatio}</span>
                </div>
                <div className="px-2 py-1 border rounded-full">
                  <span className="text-gray-500">P/S: </span>
                  <span className="font-medium">
                    {OverviewData.PriceToSalesRatioTTM}
                  </span>
                </div>
                <div className="px-2 py-1 border rounded-full">
                  <span className="text-gray-500">EBITDA: </span>
                  <span className="font-medium">
                    {autoFormatCurrency(OverviewData.EBITDA)}
                  </span>
                </div>
                <div className="px-2 py-1 border rounded-full">
                  <span className="text-gray-500">P/B: </span>
                  <span className="font-medium">
                    {OverviewData.PriceToBookRatio}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-10 grid grid-cols-2 gap-4">
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">Income Statement</h4>
              <BarChart options={options} data={IncomeStatementData} />
            </div>
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">Net Income</h4>
              <BarChart options={options} data={NetIncomeData} />
            </div>
            <div className="p-4 border space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-xl">Cash Flow</h4>
                <button className="text-gray-300 hover:text-gray-500">
                  <i className="fa-solid fa-info-circle fa-fw"></i>
                </button>
              </div>
              <BarChart options={options} data={CashFlowData} />
            </div>
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">
                Gross Profit, Operating Expense
              </h4>
              <BarChart
                options={options}
                data={GrossProfitOperatingExpenseData}
              />
            </div>
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">Cash, Working Capital</h4>
              <BarChart options={options} data={CashAndWorkingCapitalData} />
            </div>
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">Balance Sheet</h4>
              <BarChart options={options} data={BalanceSheetData} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
