import { useContext, useEffect, useState, useRef, Fragment } from "react";
import { AppConfigContext } from "@contexts/AppConfigContext.jsx";

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

import StockDashboard from "@views/customer/stocks/StockDashboard.jsx";
import StockFinancials from "@views/customer/stocks/StockFinancials.jsx";
import StockHome from "@views/customer/stocks/StockHome.jsx";
import { autoFormatCurrency } from "@/GeneralHelpers.jsx";

import { Api } from "@api/Api.jsx";

export default function Stocks() {
  const { APP_ENVIRONMENT } = useContext(AppConfigContext);

  const [isStockSearchPerformed, setIsStockSearchPerformed] = useState(false);
  const [StockSymbol, setStockSymbol] = useState("");
  const [NewsSentiments, setNewsSentiments] = useState({});
  const [tab, setTab] = useState("dashboard");

  // Loaders Indicators
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [isNewsSentimentsLoading, setIsNewsSentimentsLoading] = useState(false);

  // Stocks Core
  const [TimeSeriesIntraday, setTimeSeriesIntraday] = useState({});
  const [TimeSeriesDaily, setTimeSeriesDaily] = useState({});
  const [TimeSeriesWeekly, setTimeSeriesWeekly] = useState({});
  const [TimeSeriesMonthly, setTimeSeriesMonthly] = useState({});

  // Stocks Fundamentals
  const [Overview, setOverview] = useState({});
  const [IncomeStatement, setIncomeStatement] = useState({});
  const [CashFlow, setCashFlow] = useState({});
  const [BalanceSheet, setBalanceSheet] = useState({});
  const [Earnings, setEarnings] = useState({});

  function handleSelectStock(event) {
    let stockSymbol = event.target.value;
    setStockSymbol(stockSymbol);

    setIsStockSearchPerformed(true);
    // Here goes the sample data
    // drawChart(TIME_SERIES_MONTHLY);
    // getFundamentals(STOCK_FUNDAMENTALS);
    getNewsSentiments(NEWS_AND_SENTIMENTS);
    // setIsGraphLoading((isGraphLoading) => false);
    // setIsStockOverviewLoading((isStockOverviewLoading) => false);
    // setIsNewsSentimentsLoading((isNewsSentimentsLoading) => false);
    loadCoreStockData();
    loadStockFundamentalData();
  }

  function loadCoreStockData() {
    if (APP_ENVIRONMENT === "production") {
      let newTimeSeriesIntraday = {};
      let newTimeSeriesDaily = {};
      let newTimeSeriesWeekly = {};
      let newTimeSeriesMonthly = {};

      Api.post(
        `/core_stocks/TIME_SERIES_INTRADAY/query?function=TIME_SERIES_INTRADAY&symbol=${StockSymbol}&interval=1min&outputsize=full&datatype=json`
      )
        .then((response) => {
          newTimeSeriesIntraday = response.data;
        })
        .catch((error) => console.log(error));

      Api.post(
        `/core_stocks/TIME_SERIES_DAILY/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}`
      )
        .then((response) => {
          newTimeSeriesDaily = response.data;
        })
        .catch((error) => console.log(error));

      Api.post(
        `/core_stocks/TIME_SERIES_WEEKLY/query?function=TIME_SERIES_WEEKLY&symbol=${StockSymbol}`
      )
        .then((response) => {
          newTimeSeriesWeekly = response.data;
        })
        .catch((error) => console.log(error));

      Api.post(
        `/core_stocks/TIME_SERIES_MONTHLY/query?function=TIME_SERIES_MONTHLY&symbol=${StockSymbol}`
      )
        .then((response) => {
          newTimeSeriesMonthly = response.data;
        })
        .catch((error) => console.log(error));

      setTimeSeriesIntraday(newTimeSeriesIntraday);
      setTimeSeriesDaily(newTimeSeriesDaily);
      setTimeSeriesWeekly(newTimeSeriesWeekly);
      setTimeSeriesMonthly(newTimeSeriesMonthly);
    } else {
      setTimeSeriesIntraday(TIME_SERIES_INTRADAY);
      setTimeSeriesDaily(TIME_SERIES_DAILY);
      setTimeSeriesWeekly(TIME_SERIES_WEEKLY);
      setTimeSeriesMonthly(TIME_SERIES_MONTHLY);
    }
  }

  function loadStockFundamentalData() {
    if (APP_ENVIRONMENT === "production") {
      // Here goes the API
      let newOverview = {};
      let newIncomeStatement = {};
      let newCashFlow = {};
      let newBalanceSheet = {};
      let newEarnings = {};

      Api.post(
        `/fundamental_data/OVERVIEW/query?function=OVERVIEW&symbol=${StockSymbol}`
      )
        .then((response) => {
          newOverview = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      Api.post(
        `/fundamental_data/INCOME_STATEMENT/query?function=INCOME_STATEMENT&symbol=${StockSymbol}`
      )
        .then((response) => {
          newIncomeStatement = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      Api.post(
        `/fundamental_data/CASH_FLOW/query?function=CASH_FLOW&symbol=${StockSymbol}`
      )
        .then((response) => {
          newCashFlow = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      Api.post(
        `/fundamental_data/BALANCE_SHEET/query?function=BALANCE_SHEET&symbol=${StockSymbol}`
      )
        .then((response) => {
          newBalanceSheet = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      Api.post(
        `/fundamental_data/EARNINGS/query?function=EARNINGS&symbol=${StockSymbol}`
      )
        .then((response) => {
          newEarnings = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      setOverview(newOverview);
      setIncomeStatement(newIncomeStatement);
      setCashFlow(newCashFlow);
      setBalanceSheet(newBalanceSheet);
      setEarnings(newEarnings);
      setIsStockSearchPerformed(true);
    } else {
      setOverview(OVERVIEW);
      setIncomeStatement(INCOME_STATEMENT);
      setCashFlow(CASH_FLOW);
      setBalanceSheet(BALANCE_SHEET);
      setEarnings(EARNINGS);
      setIsStockSearchPerformed(true);
    }
  }

  const getNewsSentiments = (news_data) => {
    setNewsSentiments(news_data);
  };

  const formatTimestamp = (originalTimestamp) => {
    let formattedTimestamp = new Date(
      `${originalTimestamp.slice(0, 4)}-${originalTimestamp.slice(
        4,
        6
      )}-${originalTimestamp.slice(6, 8)}T${originalTimestamp.slice(
        9,
        11
      )}:${originalTimestamp.slice(11, 13)}:${originalTimestamp.slice(13, 15)}`
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formattedTimestamp;
  };

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
      <div className="mt-6">
        <div className="flex mb-4">
          <select
            type="text"
            className="w-1/3 mx-auto mb-4"
            onChange={handleSelectStock}
            defaultValue=""
          >
            <option value="" disabled>
              Select Stock
            </option>
            {STOCK_SYMBOLS.map((STOCK_SYMBOL, index) => {
              return <option key={index}>{STOCK_SYMBOL}</option>;
            })}
          </select>
        </div>

        {!isStockSearchPerformed && <StockHome />}

        {isStockSearchPerformed && (
          <Fragment>
            <div className="flex items-center">
              <h4 className="w-2/6 font-bold text-4xl">{StockSymbol}</h4>

              <nav className="w-2/6 -mb-px flex space-x-2" aria-label="Tabs">
                <button
                  onClick={() => setTab("dashboard")}
                  className={`w-1/3 px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    tab === "dashboard"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setTab("financials")}
                  className={`w-1/3 px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    tab === "financials"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Financials
                </button>
                <button
                  onClick={() => setTab("news_insights")}
                  className={`w-1/3 px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    tab === "news_insights"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  ✨ News Insights
                </button>
              </nav>

              <div className="w-2/6">
                <p className="w-full text-right">
                  {Overview.Currency}{" "}
                  {autoFormatCurrency(Overview.MarketCapitalization)}, -1.01%
                </p>
              </div>
            </div>

            {tab === "dashboard" && (
              <StockDashboard
                Overview={Overview}
                IncomeStatement={IncomeStatement}
                CashFlow={CashFlow}
                BalanceSheet={BalanceSheet}
                Earnings={Earnings}
              />
            )}

            {tab === "financials" && (
              <StockFinancials
                Intraday={TimeSeriesIntraday}
                Daily={TimeSeriesDaily}
                Weekly={TimeSeriesWeekly}
                Monthly={TimeSeriesMonthly}
              />
            )}
          </Fragment>
        )}

        {/* New Insights */}
        <div className={`mt-4 ${tab === "news_insights" ? "" : "hidden"} `}>
          {!StockSymbol ? (
            <div className="w-full mt-20 mb-10 text-center">
              <h4 className="text-xl font-bold text-gray-600">
                Select a stock first
              </h4>
              <p className="text-gray-400">
                You haven't selected any stock yet
              </p>
            </div>
          ) : (
            <Fragment>
              {isNewsSentimentsLoading ? (
                <p className="w-full mt-20 mb-10 text-center text-gray-400 animate-pulse">
                  Getting News...Please wait...
                </p>
              ) : (
                <div className="flex gap-8">
                  <div className="w-3/5">
                    {NewsSentiments.feed.map((newsFeed, index) => {
                      return (
                        <div
                          className="p-4 my-4 w-full border flex gap-4 shadow rounded-lg"
                          key={index}
                        >
                          <img
                            className="w-2/6 rounded-md"
                            src={newsFeed.banner_image}
                            alt=""
                          />
                          <div className="w-4/6">
                            <a
                              href={newsFeed.url}
                              target="_blank"
                              className="font-semibold text-lg text-blue-500 hover:text-blue-600 hover:underline"
                            >
                              {newsFeed.title}
                            </a>
                            <p className="text-sm text-gray-500">
                              {newsFeed.summary}
                            </p>
                            <div className="mt-6 flex items-end justify-between gap-2">
                              <div>
                                <p className="text-sm text-gray-400">
                                  {formatTimestamp(newsFeed.time_published)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  from&nbsp;
                                  <a
                                    className="font-semibold hover:underline"
                                    href={newsFeed.source_domain}
                                    target="_blank"
                                  >
                                    {newsFeed.source}
                                  </a>{" "}
                                  by{" "}
                                  <span className="font-semibold">
                                    {newsFeed.authors[0]}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6">
                                  <CircularProgressbar
                                    value={newsFeed.overall_sentiment_score}
                                    maxValue={1}
                                    styles={buildStyles({
                                      borderWidth: "2px",
                                      textColor: "#f88",
                                      trailColor: "#d6d6d6",
                                      backgroundColor: "#3e98c7",
                                    })}
                                  />
                                </div>
                                <p className="text-sm">
                                  {newsFeed.overall_sentiment_label}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-2/5">
                    <div className="sticky top-16">
                      {scoreDefinitionAsString(
                        NewsSentiments.sentiment_score_definition
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
