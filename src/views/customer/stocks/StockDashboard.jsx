import React, { Fragment, useContext, useEffect, useState } from "react";

import { AppConfigContext } from "@contexts/AppConfigContext.jsx";
import ReadMoreTruncate from "@components/common/ReadMoreTruncate.jsx";

import { STOCK_FUNDAMENTALS } from "@sample/STOCK_FUNDAMENTALS.jsx";
import { INCOME_STATEMENT } from "@sample/INCOME_STATEMENT.jsx";
import { CASH_FLOW } from "@sample/CASH_FLOW.jsx";
import { BALANCE_SHEET } from "@sample/BALANCE_SHEET.jsx";

// import IncomeStatement from "@views/customer/stocks/charts/IncomeStatement.jsx";
// import NetIncome from "@views/customer/stocks/charts/NetIncome.jsx";
// import CashFlow from "@views/customer/stocks/charts/CashFlow.jsx";
// import GrossProfitOperatingExpense from "@views/customer/stocks/charts/GrossProfitOperatingExpense.jsx";
// import CashAndWorkingCapital from "@views/customer/stocks/charts/CashAndWorkingCapital.jsx";
// import BalanceSheet from "@views/customer/stocks/charts/BalanceSheet.jsx";
import BarChart from "@components/common/charts/BarChart.jsx";

export default function StockDashboard() {
  const { APP_ENVIRONMENT } = useContext(AppConfigContext);

  const [StockOverview, setStockOverview] = useState({});
  const [incomeStatementData, setIncomeStatementData] = useState();
  const [netIncomeData, setNetIncomeData] = useState();
  const [cashFlowData, setCashFlowData] = useState();
  const [grossProfiteOperatingExpense, setGrossProfitOperatingExpense] =
    useState();
  const [cashAndWorkingCapital, setCashAndWorkingCapital] = useState();
  const [balanceSheet, setBalanceSheet] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFundamentals(STOCK_FUNDAMENTALS);
    getIncomeStatement(INCOME_STATEMENT);
    getNetIncome(INCOME_STATEMENT);
    getCashFlow(CASH_FLOW);
    getGrossProfitOperatingExpense(INCOME_STATEMENT);
    getCashAndWorkingCapital(BALANCE_SHEET);
    getBalanceSheet(BALANCE_SHEET);
    setIsLoading(false);
  }, []);

  function getFundamentals(stock_fundamentals) {
    setStockOverview(stock_fundamentals);
  }

  async function getIncomeStatement(paramsData) {
    let newLabels = [];
    let newRevenue = [];
    let newOperatingExpenses = [];
    let data = {};

    if (APP_ENVIRONMENT === "production") {
      // Here goes the API
    } else {
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
  }

  async function getNetIncome(paramsData) {
    let newLabels = [];
    let newNetIncome = [];
    let data = [];

    if (APP_ENVIRONMENT === "production") {
      // Here goes the API
    } else {
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
  }

  async function getCashFlow(paramsData) {
    let newLabels = [];
    let newOperatingCashFlow = [];
    let newCapitalExpenditure = [];
    let newFreeCashFlow = [];
    let data = [];

    if (APP_ENVIRONMENT === "production") {
      // Here goes the API
    } else {
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
  }

  async function getGrossProfitOperatingExpense(paramsData) {
    let newLabels = [];
    let newGrossProfit = [];
    let newOperatingExpenses = [];
    let data = {};

    if (APP_ENVIRONMENT === "production") {
      // Here goes the API
    } else {
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

      setGrossProfitOperatingExpense(data);
    }
  }

  async function getCashAndWorkingCapital(paramsData) {
    let newLabels = [];
    let newCash = [];
    let newWorkingCapital = [];
    let data = {};

    if (APP_ENVIRONMENT === "production") {
      // Here goes the API
    } else {
      paramsData.annualReports.map((report) => {
        newLabels.push(report.fiscalDateEnding);
        newCash.push(report.grossProfit);
        newWorkingCapital.push(report.totalCurrentAssets - report.totalCurrentLiabilities);
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

      setCashAndWorkingCapital(data);
    }
  }

  async function getBalanceSheet(paramsData) {
    let newLabels = [];
    let newTotalAssets = [];
    let newTotalLiabilities = [];
    let data = {};

    if (APP_ENVIRONMENT === "production") {
      // Here goes the API
    } else {
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

      setBalanceSheet(data);
    }
  }

  return (
    <Fragment>
      {!isLoading && (
        <Fragment>
          <div className="my-10 flex gap-2">
            <div className="w-1/2 p-4 border rounded-lg">
              <h4 className="font-semibold text-2xl">Profile</h4>
              <div className="my-4 font-mono">
                <ReadMoreTruncate
                  text={StockOverview.Description}
                  maxLength={180}
                />
              </div>

              <h6 className="mt-10 font-semibold text-lg">Key Stats</h6>
              <div className="my-4 flex gap-4">
                <div className="w-1/2">
                  <div className="p-2 font-mono bg-gray-50">
                    <p className="mb-4 text-gray-500">Growth (FY)</p>
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Revenue</p>
                      <p>{StockOverview.RevenueTTM}</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Revenue Per Share</p>
                      <p>{StockOverview.RevenuePerShareTTM} %</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Revenue Per Share</p>
                      <p>{StockOverview.RevenuePerShareTTM} %</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>EPS</p>
                      <p>{StockOverview.EPS} %</p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="p-2 font-mono bg-gray-50">
                    <p className="mb-4 text-gray-500">Profitability (FY)</p>
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Operating Margin</p>
                      <p>{StockOverview.OperatingMarginTTM} %</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Profit Margin</p>
                      <p>{StockOverview.ProfitMargin}</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Return on Equity</p>
                      <p>{StockOverview.ReturnOnEquityTTM} %</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="my-2 text-sm flex items-center justify-between">
                      <p>Return on Assets</p>
                      <p>{StockOverview.ReturnOnAssetsTTM} %</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">Income Statement</h4>
              <BarChart data={incomeStatementData} />
            </div>
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">Net Income</h4>
              <BarChart data={netIncomeData} />
            </div>
            <div className="p-4 border space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-xl">Cash Flow</h4>
                <button className="text-gray-300 hover:text-gray-500">
                  <i className="fa-solid fa-info-circle fa-fw"></i>
                </button>
              </div>
              <BarChart data={cashFlowData} />
            </div>
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">
                Gross Profit, Operating Expense
              </h4>
              <BarChart data={grossProfiteOperatingExpense} />
            </div>
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">
                Cash, Working Capital
              </h4>
              <BarChart data={cashAndWorkingCapital} />
            </div>
            <div className="p-4 border space-y-4">
              <h4 className="font-semibold text-xl">
                Balance Sheet
              </h4>
              <BarChart data={balanceSheet} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
