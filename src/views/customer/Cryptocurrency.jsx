import { useContext, useEffect, useState, useRef, Fragment } from "react";
import { AppConfigContext } from "@contexts/AppConfigContext.jsx";
import dayjs from "dayjs";

// Sample data ================================================================
// Samples for Stocks Fundamental Data
import { OVERVIEW } from "@sample/fundamentals/OVERVIEW.jsx";
import { INCOME_STATEMENT } from "@sample/fundamentals/INCOME_STATEMENT.jsx";
import { CASH_FLOW } from "@sample/fundamentals/CASH_FLOW.jsx";
import { BALANCE_SHEET } from "@sample/fundamentals/BALANCE_SHEET.jsx";
import { EARNINGS } from "@sample/fundamentals/EARNINGS.jsx";

// Samples for Stocks Core Data
import { TIME_SERIES_INTRADAY } from "@sample/core/TIME_SERIES_INTRADAY.jsx";
import { TIME_SERIES_DAILY } from "@sample/core/TIME_SERIES_DAILY.jsx";
import { TIME_SERIES_WEEKLY } from "@sample/core/TIME_SERIES_WEEKLY.jsx";
import { TIME_SERIES_MONTHLY } from "@sample/core/TIME_SERIES_MONTHLY.jsx";

// Other Sample data
import { NEWS_AND_SENTIMENTS } from "@sample/NEWS_AND_SENTIMENTS.jsx";
import { STOCK_SYMBOLS } from "@sample/STOCK_SYMBOLS.jsx";
// ============================================================================

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import StockOverview from "@views/customer/stocks/StockOverview.jsx";
import StockEarnings from "@views/customer/stocks/StockEarnings.jsx";
import StockIncomeStatement from "@views/customer/stocks/StockIncomeStatement.jsx";
import StockNetIncome from "@views/customer/stocks/StockNetIncome.jsx";
import StockFreeCashFlow from "@views/customer/stocks/StockFreeCashFlow.jsx";
import StockGrossProfitOperatingExpense from "@views/customer/stocks/StockGrossProfitOperatingExpense.jsx";
import CashWorkingCapital from "@views/customer/stocks/CashWorkingCapital.jsx";
import BalanceSheetGraph from "@views/customer/stocks/BalanceSheetGraph.jsx";
import TimeSeriesDailyGraph from "@views/customer/stocks/TimeSeriesDailyGraph.jsx";
import TimeSeriesWeeklyGraph from "@views/customer/stocks/TimeSeriesWeeklyGraph.jsx";
import TimeSeriesMonthlyGraph from "@views/customer/stocks/TimeSeriesMonthlyGraph.jsx";
import StockHome from "@views/customer/stocks/StockHome.jsx";

import { Api } from "@api/Api.jsx";

export default function Stocks() {
  const { APP_ENVIRONMENT } = useContext(AppConfigContext);

  const [isStockSearchPerformed, setIsStockSearchPerformed] = useState(false);
  const [StockSymbol, setStockSymbol] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [stockMarketViewTab, setStockMarketViewTab] = useState("Monthly");

  // Loaders Indicators
  const [isStockOverviewLoading, setIsStockOverviewLoading] = useState(true);
  const [isStockEarningsLoading, setIsStockEarningsLoading] = useState(true);
  const [isIncomeStatementLoading, setIsIncomeStatementLoading] =
    useState(true);
  const [isCashFlowLoading, setIsCashFlowLoading] = useState(true);
  const [isBalanceSheetLoading, setIsBalanceSheetLoading] = useState(true);
  const [isTimeSeriesDailyLoading, setIsTimeSeriesDailyLoading] =
    useState(true);
  const [isTimeSeriesWeeklyLoading, setIsTimeSeriesWeeklyLoading] =
    useState(true);
  const [isTimeSeriesMonthlyLoading, setIsTimeSeriesMonthlyLoading] =
    useState(true);
  const [isNewsSentimentsLoading, setIsNewsSentimentsLoading] = useState(true);

  // Stocks Fundamentals
  const [Overview, setOverview] = useState({});
  const [Earnings, setEarnings] = useState({});
  const [IncomeStatement, setIncomeStatement] = useState({});
  const [CashFlow, setCashFlow] = useState({});
  const [BalanceSheet, setBalanceSheet] = useState({});

  // Stocks Core
  const [TimeSeriesDaily, setTimeSeriesDaily] = useState({});
  const [TimeSeriesWeekly, setTimeSeriesWeekly] = useState({});
  const [TimeSeriesMonthly, setTimeSeriesMonthly] = useState({});

  // News Sentiments
  const [NewsSentiments, setNewsSentiments] = useState({});

  function handleSelectStock(event) {
    let stockSymbol = event.target.value;

    setStockSymbol((prevStockSymbol) => {
      let newStockSymbol = stockSymbol;
      return newStockSymbol;
    });

    setIsStockSearchPerformed(true);

    getStockOverview(stockSymbol);
    getStockEarnings(stockSymbol);
    // getIncomeStatement(stockSymbol);
    // getCashFlow(stockSymbol);
    // getBalanceSheet(stockSymbol);
    // getTimeSeriesDaily(stockSymbol);
    // getTimeSeriesWeekly(stockSymbol);
    // getTimeSeriesMonthly(stockSymbol);
    // getNewsSentiments(stockSymbol);
  }

  async function getStockOverview(paramsStockSymbol) {
    setIsStockOverviewLoading(true);

    if (APP_ENVIRONMENT === "production") {
      await Api.get(
        `/fundamental_data/OVERVIEW/query?function=OVERVIEW&symbol=${paramsStockSymbol}`
      )
        .then((response) => {
          setOverview((prevOverview) => {
            let newOverview = response.data;
            return newOverview;
          });
          setIsStockOverviewLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setOverview(OVERVIEW);
      setIsStockOverviewLoading(false);
    }
  }

  async function getStockEarnings(paramsStockSymbol) {
    if (APP_ENVIRONMENT === "production") {
      await Api.get(
        `/fundamental_data/EARNINGS/query?function=EARNINGS&symbol=${paramsStockSymbol}`
      )
        .then((response) => {
          setEarnings((prevStockEarnings) => {
            let newStockEarnings = response.data;
            return newStockEarnings;
          });
          setIsStockEarningsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setEarnings(EARNINGS);
      setIsStockEarningsLoading(false);
    }
  }

  async function getIncomeStatement(paramsStockSymbol) {
    if (APP_ENVIRONMENT === "production") {
      await Api.get(
        `/fundamental_data/INCOME_STATEMENT/query?function=INCOME_STATEMENT&symbol=${paramsStockSymbol}`
      )
        .then((response) => {
          setIncomeStatement((prevIncomeStatement) => {
            let newIncomeStatement = response.data;
            return newIncomeStatement;
          });
          setIsIncomeStatementLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIncomeStatement(INCOME_STATEMENT);
      setIsIncomeStatementLoading(false);
    }
  }

  async function getCashFlow(paramsStockSymbol) {
    if (APP_ENVIRONMENT === "production") {
      await Api.get(
        `/fundamental_data/CASH_FLOW/query?function=CASH_FLOW&symbol=${paramsStockSymbol}`
      )
        .then((response) => {
          setCashFlow((prevCashFlow) => {
            let newCashFlow = response.data;
            return newCashFlow;
          });
          setIsCashFlowLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCashFlow(CASH_FLOW);
      setIsCashFlowLoading(false);
    }
  }

  async function getBalanceSheet(paramsStockSymbol) {
    if (APP_ENVIRONMENT === "production") {
      await Api.get(
        `/fundamental_data/BALANCE_SHEET/query?function=BALANCE_SHEET&symbol=${paramsStockSymbol}`
      )
        .then((response) => {
          setBalanceSheet((prevBalanceSheet) => {
            let newBalanceSheet = response.data;
            return newBalanceSheet;
          });
          setIsBalanceSheetLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setBalanceSheet(BALANCE_SHEET);
      setIsBalanceSheetLoading(false);
    }
  }

  async function getTimeSeriesDaily(paramsStockSymbol) {
    if (APP_ENVIRONMENT === "production") {
      Api.get(
        `/core_stocks/TIME_SERIES_DAILY/query?function=TIME_SERIES_DAILY&symbol=${paramsStockSymbol}`
      )
        .then((response) => {
          setTimeSeriesDaily((prevTimeSeriesDaily) => {
            let newTimeSeriesDaily = response.data;
            return newTimeSeriesDaily;
          });
          setIsTimeSeriesDailyLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setTimeSeriesDaily(TIME_SERIES_DAILY);
      setIsTimeSeriesDailyLoading(false);
    }
  }

  async function getTimeSeriesWeekly(paramsStockSymbol) {
    if (APP_ENVIRONMENT === "production") {
      Api.get(
        `/core_stocks/TIME_SERIES_WEEKLY/query?function=TIME_SERIES_WEEKLY&symbol=${paramsStockSymbol}`
      )
        .then((response) => {
          setTimeSeriesWeekly((prevTimeSeriesWeekly) => {
            let newTimeSeriesWeekly = response.data;
            return newTimeSeriesWeekly;
          });
          setIsTimeSeriesWeeklyLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setTimeSeriesWeekly(TIME_SERIES_WEEKLY);
      setIsTimeSeriesWeeklyLoading(false);
    }
  }

  async function getTimeSeriesMonthly(paramsStockSymbol) {
    if (APP_ENVIRONMENT === "production") {
      Api.get(
        `/core_stocks/TIME_SERIES_MONTHLY/query?function=TIME_SERIES_MONTHLY&symbol=${paramsStockSymbol}`
      )
        .then((response) => {
          setTimeSeriesMonthly((prevTimeSeriesMonthly) => {
            let newTimeSeriesMonthly = response.data;
            return newTimeSeriesMonthly;
          });
          setIsTimeSeriesMonthlyLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setTimeSeriesMonthly(TIME_SERIES_MONTHLY);
      setIsTimeSeriesMonthlyLoading(false);
    }
  }

  function getNewsSentiments(paramsStockSymbol) {
    if (APP_ENVIRONMENT === "production") {
      let actualTime = dayjs();
      let timeFrom = actualTime.format("YYYYMMDDTHHMM");
      let timeTo = actualTime.add(30, "day");

      Api.get(
        `/news_insights/NEWS_SENTIMENT/query?function=NEWS_SENTIMENT&tickers=${paramsStockSymbol}&topics=technology&time_from=${timeFrom}&time_to=${timeTo}&sort=LATEST&limit=50`
      )
        .then((response) => {
          setNewsSentiments((prevNewsSentiments) => {
            let newNewsSentiments = response.data;
            return newNewsSentiments;
          });

          setIsNewsSentimentsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setNewsSentiments(NEWS_AND_SENTIMENTS);
      setIsNewsSentimentsLoading(false);
    }
  }

  const scoreDefinitionAsString = (scoreString) => {
    // sentiment_score_definition as a string
    // const sentimentDefinition =
    //   "x <= -0.35: Bearish; -0.35 < x <= -0.15: Somewhat-Bearish; -0.15 < x < 0.15: Neutral; 0.15 <= x < 0.35: Somewhat_Bullish; x >= 0.35: Bullish";

    const sentimentDefinition = scoreString;

    // Splitting the definition into individual parts
    const parts = sentimentDefinition.split(";");

    // Function to extract data and values
    const extractDataAndValues = (part) => {
      const [condition, label] = part.split(":");
      const [range, value] = condition.split(" ");

      // Extracting lower and upper bounds
      const [lower, upper] = range.split("<=").map((str) => parseFloat(str));

      return {
        lower,
        upper,
        label: label.trim(),
        value: parseFloat(value),
      };
    };

    // Extracting data and values for each part
    const sentimentData = parts.map(extractDataAndValues);

    // Drawing circular progress bars for each sentiment data
    return (
      <div className="flex flex-col gap-4">
        <h1 className="mt-2 text-xl">Overall Sentiment</h1>
        {sentimentData.map((data, index) => {
          return (
            <div className="flex items-center gap-4" key={index}>
              <div className="w-8 h-8">
                <CircularProgressbar value={data.value} maxValue={1} />
              </div>
              <p className="text-sm text-center">{data.label}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1>Cryptocurrency</h1>
    </div>
  );
}
