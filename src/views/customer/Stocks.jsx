import { useContext, useEffect, useState, useRef, Fragment } from "react";
import { AppConfigContext } from "@contexts/AppConfigContext.jsx";
import ReadMoreTruncate from "@components/common/ReadMoreTruncate.jsx";

import { ColorType, createChart } from "lightweight-charts";

// Sample data ================================================================
import { TIME_SERIES_MONTHLY } from "@sample/STOCK_FUNCTION.jsx";
import { STOCK_FUNDAMENTALS } from "@sample/STOCK_FUNDAMENTALS.jsx";
import { NEWS_AND_SENTIMENTS } from "@sample/NEWS_INSIGHTS.jsx";
import { STOCK_SYMBOLS } from "@sample/STOCK_SYMBOLS.jsx";
// ============================================================================

import { transform } from "@/GeneralHelpers.jsx";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Api } from "@api/Api.jsx";

export default function UserStocks() {
  const { APP_ENVIRONMENT } = useContext(AppConfigContext);

  const chartContainer = useRef();

  const [isStockSearchPerformed, setIsStockSearchPerformed] = useState(false);
  const [StockSymbol, setStockSymbol] = useState("");
  const [StockOverview, setStockOverview] = useState({});
  const [NewsSentiments, setNewsSentiments] = useState({});
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(new Date());
  const [tab, setTab] = useState("dashboard");

  // Loaders Indicators
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [isStockOverviewLoading, setIsStockOverviewLoading] = useState(false);
  const [isNewsSentimentsLoading, setIsNewsSentimentsLoading] = useState(false);

  const handleSelectStock = (event) => {
    let stockSymbol = event.target.value;
    setStockSymbol(stockSymbol);

    setIsStockSearchPerformed((isStockSearchPerformed) => true);
    setIsGraphLoading((isGraphLoading) => true);
    setIsStockOverviewLoading((isStockOverviewLoading) => true);
    setIsNewsSentimentsLoading((isNewsSentimentsLoading) => true);

    if (APP_ENVIRONMENT === "production") {
      // Here goes the API
    } else {
      // Here goes the sample data
      // drawChart(TIME_SERIES_MONTHLY);
      getFundamentals(STOCK_FUNDAMENTALS);
      getNewsSentiments(NEWS_AND_SENTIMENTS);

      setTimeout(() => {
        setIsGraphLoading((isGraphLoading) => false);
        setIsStockOverviewLoading((isStockOverviewLoading) => false);
        setIsNewsSentimentsLoading((isNewsSentimentsLoading) => false);
      }, 3000);
    }
  };

  // const drawChart = (plotData) => {
  //   let initialData = transform(plotData);

  //   const chart = createChart(chartContainer.current, {
  //     layout: {
  //       background: { type: ColorType.Solid, color: "white" },
  //     },
  //     width: chartContainer.current.clientWidth,
  //     height: 240,
  //   });

  //   const candlestickSeries = chart.addCandlestickSeries({
  //     upColor: "#26a69a",
  //     downColor: "#ef5350",
  //     borderVisible: false,
  //     wickUpColor: "#26a69a",
  //     wickDownColor: "#ef5350",
  //   });

  //   candlestickSeries.setData(initialData.monthly_time_series);

  //   return () => {
  //     chart.remove();
  //   };
  // };

  const getFundamentals = (fundamentals_data) => {
    setStockOverview(fundamentals_data);
  };

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

        {!isStockSearchPerformed && (
          <Fragment>
            <h1>This section will show a stock info</h1>
          </Fragment>
        )}

        {isStockSearchPerformed && (
          <Fragment>
            <div className="flex items-center">
              <h4 className="w-1/4 font-bold text-4xl">{StockSymbol}</h4>

              <nav className="w-2/4 -mb-px flex space-x-2" aria-label="Tabs">
                <button
                  onClick={() => setTab("dashboard")}
                  className={`w-1/4 px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    tab === "dashboard"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setTab("financials")}
                  className={`w-1/4 px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    tab === "financials"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Financials
                </button>
                <button
                  onClick={() => setTab("fundamental")}
                  className={`w-1/4 px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    tab === "fundamental"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Fundamental
                </button>
                <button
                  onClick={() => setTab("news_insights")}
                  className={`w-1/4 px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    tab === "news_insights"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  ✨ News Insights
                </button>
              </nav>

              <div className="w-1/4">
                <p className="w-full text-right">$ 1.46 T, -1.01%</p>
              </div>
            </div>

            {tab === "dashboard" && (
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
            )}

            {tab === 'financials' && (
              <Fragment>
                <h1>Financials</h1>
              </Fragment>
            )}
          </Fragment>
        )}

        {/* Fundamentals */}
        <div className={`mt-4 ${tab === "fundamental" ? "" : "hidden"} `}>
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
            <div className="w-full">
              {isStockOverviewLoading ? (
                <p className="w-full mt-20 mb-10 text-center text-gray-400 animate-pulse">
                  Looking for stock fundamentals...Please wait...
                </p>
              ) : (
                <Fragment>
                  <h1 className="text-2xl font-bold">
                    {StockOverview.Name} ({StockOverview.Symbol})
                  </h1>
                  <p className="mt-1 text-gray-400">{StockOverview.Address}</p>
                  <p className="mt-4 text-sm text-gray-500 w-1/2">
                    {StockOverview.Description}
                  </p>
                  <div className="mt-10 mb-20 grid grid-cols-4 gap-4">
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">CIK</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.CIK}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Exchange</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.Exchange}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Currency</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.Currency}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Country</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.Country}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Sector</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.Sector}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Industry</p>
                      <p className="mt-1 text-xl font-semibold">
                        {StockOverview.Industry}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Fiscal Year End</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.FiscalYearEnd}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Latest Quarter</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.LatestQuarter}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Market Capitalization</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.MarketCapitalization}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">EBITDA</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.EBITDA}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">PE Ratio</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.PEGRatio}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Book Value</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.BookValue}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Dividend Per Share</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.DividendPerShare}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Dividend Yield</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.DividendYield}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">EPS</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.EPS}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Revenue Per Share (TTM)</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.RevenuePerShareTTM}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Profit Margin</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.ProfitMargin}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Operating Margin (TTM)</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.OperatingMarginTTM}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Return on Assets (TTM)</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.ReturnOnAssetsTTM}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Return on Equity (TTM)</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.ReturnOnEquityTTM}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Revenue (TTM)</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.RevenueTTM}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Gross Profit (TTM)</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.GrossProfitTTM}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Diluted EPS (TTM)</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.DilutedEPSTTM}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">
                        Quarterly Earnings Growth (YoY)
                      </p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.QuarterlyEarningsGrowthYOY}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">
                        Quarterly Revenue Growth (YoY)
                      </p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.QuarterlyRevenueGrowthYOY}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Analyst Target Price</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.AnalystTargetPrice}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Trailing PE</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.TrailingPE}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Forward PE</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.ForwardPE}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">
                        Price to Sales Ratio (TTM)
                      </p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.PriceToSalesRatioTTM}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Price to Book Ratio</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.PriceToBookRatio}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">EV to Revenue</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.EVToRevenue}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">EV to EBITDA</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.EVToEBITDA}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Beta</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.Beta}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">52-Week High</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview["52WeekHigh"]}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">52-Week Low</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview["52WeekLow"]}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">50-Day Moving Average</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview["50DayMovingAverage"]}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">200-Day Moving Average</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview["200DayMovingAverage"]}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Shares Outstanding</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.SharesOutstanding}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Dividend Date</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.DividendDate}
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="text-indigo-600">Ex-Dividend Date</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {StockOverview.ExDividendDate}
                      </p>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          )}
        </div>

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
