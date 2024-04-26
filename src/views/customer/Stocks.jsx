import { useContext, useEffect, useState, useRef, Fragment } from "react";
import { AppConfigContext } from "@contexts/AppConfigContext.jsx";
import dayjs from "dayjs";
import CompanyStockTicker from "@views/customer/ticker/CompanyStockTicker";

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
    getIncomeStatement(stockSymbol);
    getCashFlow(stockSymbol);
    getBalanceSheet(stockSymbol);
    getTimeSeriesDaily(stockSymbol);
    getTimeSeriesWeekly(stockSymbol);
    getTimeSeriesMonthly(stockSymbol);
    getNewsSentiments(stockSymbol);
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
      <CompanyStockTicker direction="left" />
      <div className="mt-6">
        <div className="flex mb-4">
          <select
            type="text"
            className="w-1/3 my-10 py-2 px-4 bg-white mx-auto border hover:border-gray-300 rounded-lg cursor-pointer"
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
                  onClick={() => setTab("market")}
                  className={`w-1/3 px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    tab === "market"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Market
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
                <p className="w-full text-right text-blue-600">
                  {Overview.Currency}{" "}
                  {Overview.MarketCapitalization}
                </p>
              </div>
            </div>

            <div className="my-10">
              {tab === "dashboard" && (
                <Fragment>
                  <div className="flex gap-4">
                    <div className="w-1/2 p-4 border rounded-lg">
                      {!isStockOverviewLoading && (
                        <StockOverview data={Overview} />
                      )}
                    </div>
                    <div className="w-1/2 p-4 border rounded-lg">
                      {!isStockEarningsLoading && (
                        <Fragment>
                          <StockEarnings data={Earnings} overview={Overview} />
                        </Fragment>
                      )}
                    </div>
                  </div>

                  {!isIncomeStatementLoading && (
                    <div className="my-10 flex gap-4">
                      <div className="w-1/2 p-4 border rounded-lg">
                        <h4 className="font-semibold text-xl">
                          Income Statement
                        </h4>
                        <StockIncomeStatement data={IncomeStatement} />
                      </div>
                      <div className="w-1/2 p-4 border rounded-lg">
                        <h4 className="font-semibold text-xl">Net Income</h4>
                        <StockNetIncome data={IncomeStatement} />
                      </div>
                    </div>
                  )}

                  {!isCashFlowLoading && (
                    <div className="my-10 p-4 border rounded-lg">
                      <h4 className="font-semibold text-xl">Free Cash Flow</h4>
                      <StockFreeCashFlow data={CashFlow} />
                    </div>
                  )}

                  <div className="my-10 flex gap-4">
                    <div className="w-1/2 p-4 border rounded-lg">
                      <h4 className="font-semibold text-xl">
                        Gross Profit, Operating Expense
                      </h4>
                      {!isIncomeStatementLoading && (
                        <StockGrossProfitOperatingExpense
                          data={IncomeStatement}
                        />
                      )}
                    </div>
                    <div className="w-1/2 p-4 border rounded-lg">
                      <h4 className="font-semibold text-xl">
                        Cash, Working Capital
                      </h4>
                      {!isBalanceSheetLoading && (
                        <CashWorkingCapital data={BalanceSheet} />
                      )}
                    </div>
                  </div>

                  {!isBalanceSheetLoading && (
                    <div className="my-10 p-4 border rounded-lg">
                      <h4 className="font-semibold text-xl">Balance Sheet</h4>
                      <BalanceSheetGraph data={BalanceSheet} />
                    </div>
                  )}
                </Fragment>
              )}

              {tab === "market" && (
                <Fragment>
                  <div className="flex text-sm gap-1 rounded-lg">
                    <button
                      onClick={() => setStockMarketViewTab("Daily")}
                      className={`${
                        stockMarketViewTab === "Daily"
                          ? "text-gray-600 bg-gray-100"
                          : ""
                      } py-1 px-2 rounded-lg`}
                    >
                      Daily
                    </button>
                    <button
                      onClick={() => setStockMarketViewTab("Weekly")}
                      className={`${
                        stockMarketViewTab === "Weekly"
                          ? "text-gray-600 bg-gray-100"
                          : ""
                      } py-1 px-2 rounded-lg`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setStockMarketViewTab("Monthly")}
                      className={`${
                        stockMarketViewTab === "Monthly"
                          ? "text-gray-600 bg-gray-100"
                          : ""
                      } py-1 px-2 rounded-lg`}
                    >
                      Monthly
                    </button>
                  </div>

                  {stockMarketViewTab === "Daily" && (
                    <Fragment>
                      {!isTimeSeriesDailyLoading && (
                        <TimeSeriesDailyGraph plotData={TimeSeriesDaily} />
                      )}
                    </Fragment>
                  )}
                  {stockMarketViewTab === "Weekly" && (
                    <Fragment>
                      {!isTimeSeriesWeeklyLoading && (
                        <TimeSeriesWeeklyGraph plotData={TimeSeriesWeekly} />
                      )}
                    </Fragment>
                  )}
                  {stockMarketViewTab === "Monthly" && (
                    <Fragment>
                      {!isTimeSeriesMonthlyLoading && (
                        <TimeSeriesMonthlyGraph plotData={TimeSeriesMonthly} />
                      )}
                    </Fragment>
                  )}
                </Fragment>
              )}
            </div>
          </Fragment>
        )}

        {/* New Insights */}
        {tab === "news_insights" && (
          <Fragment>
            {!isNewsSentimentsLoading && (
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
                                {dayjs(newsFeed.time_published).format(
                                  "DD MMM YYYY"
                                )}
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
  );
}
