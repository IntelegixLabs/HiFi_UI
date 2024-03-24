import { useContext, useEffect, useState, useRef, Fragment } from "react";
import { AppConfigContext } from "@contexts/AppConfigContext.jsx";

import { ColorType, createChart } from "lightweight-charts";

import { TIME_SERIES_MONTHLY } from "@sample/STOCK_FUNCTION.jsx";
import { STOCK_FUNDAMENTALS } from "@sample/STOCK_FUNDAMENTALS.jsx";
import { NEWS_AND_SENTIMENTS } from "@sample/NEWS_INSIGHTS.jsx";

import { transform } from "@/GeneralHelpers.jsx";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Api } from "@api/Api.jsx";

export default function UserStocks() {
  const { APP_ENVIRONMENT } = useContext(AppConfigContext);

  const [StockSymbol, setStockSymbol] = useState("");
  const [StockOverview, setStockOverview] = useState({});
  const [NewsSentiments, setNewsSentiments] = useState({});
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(new Date());
  const [tab, setTab] = useState("graph");

  // Loaders Indicators
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [isStockOverviewLoading, setIsStockOverviewLoading] = useState(false);
  const [isNewsSentimentsLoading, setIsNewsSentimentsLoading] = useState(false);

  useEffect(() => {
    Api.get('/healthy').then((response) => {
      console.log(response.data.detail);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  const chartContainer = useRef();

  const selectStock = (event) => {
    let stockSymbol = event.target.value;
    setStockSymbol(stockSymbol);

    console.log(event.target.value);

    setIsGraphLoading(true);
    setIsStockOverviewLoading(true);
    setIsNewsSentimentsLoading(true);

    if (APP_ENVIRONMENT === "production") {
      Api.get(
        `/core_stocks/TIME_SERIES_MONTHLY/query?function=TIME_SERIES_MONTHLY&symbol=${stockSymbol}`
      )
        .then((response) => {
          drawChart(response.data);
          setIsGraphLoading(false);
        })
        .catch((error) => {
          setIsGraphLoading(false);
          console.log(error);
        });

      Api.get(
        `/fundamental_data/OVERVIEW/query?function=OVERVIEW&symbol=${stockSymbol}`
      )
        .then((response) => {
          setStockOverview(response.data);
          setIsStockOverviewLoading(false);
        })
        .catch((error) => {
          setIsStockOverviewLoading(false);
          console.log(error);
        });

      Api.get(
        `/news_insights/NEWS_SENTIMENT/query?function=NEWS_SENTIMENT&tickers=IBM&topics=technology&time_from=20240101T0000&time_to=20240201T0000&sort=LATEST&limit=50`
      )
        .then((response) => {
          setNewsSentiments(response.data);
          setIsNewsSentimentsLoading(false);
        })
        .catch((error) => {
          setIsNewsSentimentsLoading(false);
          console.log(error);
        });
    } else {
      drawChart(TIME_SERIES_MONTHLY);
      getFundamentals(STOCK_FUNDAMENTALS);
      getNewsSentiments(NEWS_AND_SENTIMENTS);

      setTimeout(() => {
        setIsGraphLoading(false);
        setIsStockOverviewLoading(false);
        setIsNewsSentimentsLoading(false);
      }, 3000);
    }
  };

  const drawChart = (plotData) => {
    let initialData = transform(plotData);

    const chart = createChart(chartContainer.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
      },
      width: chartContainer.current.clientWidth,
      height: 512,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData(initialData.monthly_time_series);

    return () => {
      chart.remove();
    };
  };

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

  const dateFormatterToTimestamp = (selectedDate) => {
    return date.toISOString().slice(0, 13).replace(/[-:T]/g, "") + "00";
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-6">
        <div className="flex justify-between gap-10">
          <div className="w-full bg-white border-b border-gray-200">
            <nav className="-mb-px flex gap-2" aria-label="Tabs">
              <button
                onClick={() => setTab("graph")}
                className={`px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                  tab === "graph"
                    ? "text-sky-600 border-sky-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Graph
              </button>
              <button
                onClick={() => setTab("fundamental")}
                className={`px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                  tab === "fundamental"
                    ? "text-sky-600 border-sky-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Fundamental
              </button>
              <button
                onClick={() => setTab("news_insights")}
                className={`px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                  tab === "news_insights"
                    ? "text-sky-600 border-sky-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                ✨ News Insights
              </button>
            </nav>
          </div>
          <select
            className="px-4 py-2 text-sm border bg-white rounded"
            onChange={selectStock}
            defaultValue=""
          >
            <option value="" disabled>
              Select Stock
            </option>
            <option>IBM</option>
            <option>AMZN</option>
            <option>OEDV</option>
            <option>AAPL</option>
            <option>BAC</option>
            <option>T</option>
            <option>GOOG</option>
            <option>MO</option>
            <option>DAL</option>
            <option>AA</option>
            <option>AXP</option>
            <option>DD</option>
            <option>BABA</option>
            <option>ABT</option>
            <option>UA</option>
            <option>AMAT</option>
            <option>AMGN</option>
            <option>AAL</option>
            <option>AIG</option>
            <option>ALL</option>
            <option>ADBE</option>
            <option>GOOGL</option>
            <option>ACN</option>
            <option>ABBV</option>
            <option>MT</option>
            <option>LLY</option>
            <option>AGN</option>
            <option>APA</option>
            <option>ADP</option>
            <option>APC</option>
            <option>AKAM</option>
            <option>NLY</option>
            <option>ABX</option>
            <option>ATVI</option>
            <option>ADSK</option>
            <option>ADM</option>
            <option>BMH.AX</option>
            <option>WBA</option>
            <option>ARNA</option>
            <option>LUV</option>
            <option>ACAD</option>
            <option>PANW</option>
            <option>AMD</option>
            <option>AET</option>
            <option>AEP</option>
            <option>ALXN</option>
            <option>CLMS</option>
            <option>AVGO</option>
            <option>EA</option>
            <option>DB</option>
            <option>RAI</option>
            <option>AEM</option>
            <option>APD</option>
            <option>AMBA</option>
            <option>NVS</option>
            <option>APOL</option>
            <option>ANF</option>
            <option>LULU</option>
            <option>RAD</option>
            <option>BRK.AX</option>
            <option>ARRY</option>
            <option>AGNC</option>
            <option>JBLU</option>
            <option>A</option>
            <option>ORLY</option>
            <option>FOLD</option>
            <option>AZO</option>
            <option>ATML</option>
            <option>AN</option>
            <option>AZN</option>
            <option>AES</option>
            <option>GAS</option>
            <option>BUD</option>
            <option>ARR</option>
            <option>BDX</option>
            <option>AKS</option>
            <option>AB</option>
            <option>ACOR</option>
            <option>CS</option>
            <option>AFL</option>
            <option>ADI</option>
            <option>AEGR</option>
            <option>ACIW</option>
            <option>AMP</option>
            <option>AVP</option>
            <option>AMTD</option>
            <option>AEO</option>
            <option>AWK</option>
            <option>NVO</option>
            <option>ALTR</option>
            <option>ALK</option>
            <option>PAA</option>
            <option>MTU.AX</option>
            <option>ARCC</option>
            <option>AAP</option>
            <option>NAT</option>
            <option>FNMA</option>
            <option>FAV</option>
            <option>AIV</option>
            <option>AGIO</option>
            <option>AEE</option>
            <option>UBS</option>
            <option>AVXL</option>
            <option>ARLP</option>
            <option>ANTM</option>
            <option>AGU</option>
            <option>AG</option>
            <option>AFSI</option>
            <option>ABC</option>
            <option>STO</option>
            <option>ATI</option>
            <option>ADT</option>
            <option>AVB</option>
            <option>ATW</option>
            <option>ALNY</option>
            <option>LH</option>
            <option>AVY</option>
            <option>AUY</option>
            <option>ASH</option>
            <option>ARMH</option>
            <option>ARIA</option>
            <option>ANR</option>
            <option>AINV</option>
            <option>ACXM</option>
            <option>ACHN</option>
            <option>ACET</option>
            <option>ABMD</option>
            <option>ABM</option>
            <option>VA</option>
            <option>LIFE</option>
            <option>ATO</option>
            <option>ARP</option>
            <option>AON</option>
            <option>ADXS</option>
            <option>ADC</option>
            <option>APU</option>
            <option>SAVE</option>
            <option>AV</option>
            <option>AKRX</option>
            <option>ADS</option>
            <option>ABAX</option>
            <option>AYI</option>
            <option>AWH</option>
            <option>ASML</option>
            <option>AMT</option>
            <option>ALDR</option>
            <option>ACM</option>
            <option>DWA</option>
            <option>ATRS</option>
            <option>ARW</option>
            <option>ARI</option>
            <option>ARG</option>
            <option>AR</option>
            <option>AMCC</option>
            <option>AMC</option>
            <option>AL</option>
            <option>AGEN</option>
            <option>AAN</option>
            <option>WTR</option>
            <option>FCAU</option>
            <option>BAH</option>
            <option>AXAS</option>
            <option>AVT</option>
            <option>ALB</option>
            <option>AIZ</option>
            <option>SAIC</option>
            <option>CAR</option>
            <option>AXLL</option>
            <option>AU</option>
            <option>ARO</option>
            <option>APH</option>
            <option>ANTH</option>
            <option>AMX</option>
            <option>AMDA</option>
            <option>AI</option>
            <option>ABCO</option>
            <option>WMC</option>
            <option>MPX.AX</option>
            <option>JKHY</option>
            <option>AVAV</option>
            <option>AMKR</option>
            <option>ALJ</option>
            <option>ACH</option>
            <option>GPH.AX</option>
            <option>ERC</option>
            <option>APPY</option>
            <option>ANAC</option>
            <option>AEIS</option>
            <option>Y</option>
            <option>MTGE</option>
            <option>CENX</option>
            <option>ASPS</option>
            <option>AMRN</option>
            <option>AMPE</option>
            <option>AMAG</option>
            <option>ALKS</option>
            <option>AFFX</option>
            <option>ADES</option>
            <option>ACAT</option>
            <option>AAON</option>
            <option>XLRN</option>
            <option>VRSK</option>
            <option>VJET</option>
            <option>OA</option>
            <option>ATLS</option>
            <option>APTS</option>
            <option>APO</option>
            <option>ALSK</option>
            <option>ALG</option>
            <option>AHC</option>
            <option>ACTG</option>
            <option>ACAS</option>
            <option>RBA</option>
            <option>MAA</option>
            <option>BAM</option>
            <option>ATHN</option>
            <option>AT</option>
            <option>ASX</option>
            <option>ARCO</option>
            <option>ANET</option>
            <option>ANCX</option>
            <option>AIR</option>
            <option>AF</option>
            <option>WAB</option>
            <option>RS</option>
            <option>PKG</option>
            <option>CSH</option>
            <option>AXDX</option>
            <option>AVHI</option>
            <option>AVA</option>
            <option>ATHX</option>
            <option>ARWR</option>
            <option>ANGI</option>
            <option>AMG</option>
            <option>ALSN</option>
            <option>ALGN</option>
            <option>AKBA</option>
            <option>AGO</option>
            <option>AEZS</option>
            <option>ACRX</option>
            <option>ROK</option>
            <option>GLPI</option>
            <option>DNI</option>
            <option>AZZ</option>
            <option>ATRC</option>
            <option>ARRS</option>
            <option>ARMK</option>
            <option>AOS</option>
            <option>ANFI</option>
            <option>AMID</option>
            <option>AMCX</option>
            <option>ALIM</option>
            <option>ALE</option>
            <option>AHT</option>
            <option>ACW</option>
            <option>ABB</option>
            <option>AALI.JK</option>
            <option>SPR</option>
            <option>SEE</option>
            <option>RDEN</option>
            <option>PAAS</option>
            <option>DLPH</option>
            <option>ADAC</option>
            <option>CBL</option>
            <option>BBVA</option>
            <option>AYR</option>
            <option>APOG</option>
            <option>ANDE</option>
            <option>AMSC</option>
            <option>AMRS</option>
            <option>AMED</option>
            <option>ALEX</option>
            <option>ALCO</option>
            <option>ADUS</option>
            <option>ACTA</option>
            <option>ACST</option>
            <option>AAWW</option>
            <option>WMS</option>
            <option>PAG</option>
            <option>MDRX</option>
            <option>KLIC</option>
            <option>ETH</option>
            <option>AZPN</option>
            <option>AXE</option>
            <option>ATNY</option>
            <option>APRI</option>
            <option>AMH</option>
            <option>AME</option>
            <option>AJG</option>
            <option>AIQ</option>
            <option>AHGP</option>
            <option>AGCO</option>
            <option>AERI</option>
            <option>ACRE</option>
            <option>ABEO</option>
            <option>WAL</option>
            <option>SYT</option>
            <option>SHLM</option>
            <option>NOG</option>
            <option>HTA</option>
            <option>GIII</option>
            <option>DAVE</option>
            <option>CVU</option>
            <option>BSI</option>
            <option>AWAY</option>
            <option>ATU</option>
            <option>ASTI</option>
            <option>AREX</option>
            <option>ARE</option>
            <option>ANSS</option>
            <option>AMNB</option>
            <option>AMBS</option>
            <option>ALR</option>
            <option>AIXG</option>
            <option>AIN</option>
            <option>AHL</option>
            <option>AGX</option>
            <option>AEG</option>
            <option>ADTN</option>
            <option>ADMS</option>
            <option>ACLS</option>
            <option>ABG</option>
            <option>ZX</option>
            <option>NXJ</option>
            <option>KS</option>
            <option>HOLI</option>
            <option>GPI</option>
            <option>ENI</option>
            <option>BEAV</option>
            <option>AXTA</option>
            <option>AWR</option>
            <option>AWI</option>
            <option>AVEO</option>
            <option>AUO</option>
            <option>ATHM</option>
            <option>ATAX</option>
            <option>ASM</option>
            <option>AROC</option>
            <option>ANH</option>
            <option>ALX</option>
            <option>AHS</option>
            <option>AGI</option>
            <option>AER</option>
            <option>AE</option>
            <option>RHHBY</option>
            <option>PETX</option>
            <option>ODC</option>
            <option>NAO</option>
            <option>KAR</option>
            <option>HUSA</option>
            <option>HIVE</option>
            <option>FMS</option>
            <option>DOX</option>
            <option>CXW</option>
            <option>AZUR</option>
            <option>AXS</option>
            <option>AXL</option>
            <option>AWX</option>
            <option>AVID</option>
            <option>ASNA</option>
            <option>ASGN</option>
            <option>ARDX</option>
            <option>ARAY</option>
            <option>AQXP</option>
            <option>APT</option>
            <option>APDN</option>
            <option>AMBC</option>
            <option>ALGT</option>
            <option>ALDW</option>
            <option>AIT</option>
            <option>AIRM</option>
            <option>AIMC</option>
            <option>AEL</option>
            <option>AEHR</option>
            <option>ADHD</option>
            <option>ACUR</option>
            <option>ACHC</option>
            <option>ACFC</option>
            <option>ACCO</option>
            <option>ABY</option>
            <option>TA</option>
            <option>RPAI</option>
            <option>MANH</option>
            <option>LAMR</option>
            <option>KYN</option>
            <option>AXN</option>
            <option>ATRO</option>
            <option>ATNI</option>
            <option>ARCW</option>
            <option>APEI</option>
            <option>AP</option>
            <option>ANIK</option>
            <option>ANGO</option>
            <option>AMTG</option>
            <option>AMSG</option>
            <option>AMOT</option>
            <option>AM</option>
            <option>ALV</option>
            <option>ALOG</option>
            <option>AKR</option>
            <option>AEGN</option>
            <option>ADS.DE</option>
            <option>ZLTQ</option>
            <option>WRLD</option>
            <option>UHAL</option>
            <option>UAMY</option>
            <option>SAH</option>
            <option>RJET</option>
            <option>NAII</option>
            <option>AQNM</option>
            <option>CAS</option>
            <option>CACC</option>
            <option>ATSG</option>
            <option>ASEI</option>
            <option>ASB</option>
            <option>ARTX</option>
            <option>AROW</option>
            <option>ARCB</option>
            <option>AMRK</option>
            <option>ALRM</option>
            <option>AHP</option>
            <option>AGRX</option>
            <option>AFAM</option>
            <option>ADK</option>
            <option>ACSF</option>
            <option>ABTL</option>
            <option>ABGB</option>
            <option>ABEV</option>
            <option>ABCD</option>
            <option>AAOI</option>
            <option>USAP</option>
            <option>STFC</option>
            <option>STAY</option>
            <option>SEED</option>
            <option>RGA</option>
            <option>IDSA</option>
            <option>HART</option>
            <option>CH</option>
            <option>CEA</option>
            <option>BREW</option>
            <option>AXR</option>
            <option>AVG</option>
            <option>AVD</option>
            <option>AUDC</option>
            <option>ATRI</option>
            <option>ATOS</option>
            <option>ARC</option>
            <option>APIC</option>
            <option>AOSL</option>
            <option>AOI</option>
            <option>AMWD</option>
            <option>ALXA</option>
            <option>ALLY</option>
            <option>AIRI</option>
            <option>AFOP</option>
            <option>ACGL</option>
            <option>ACFN</option>
            <option>ABR</option>
            <option>ABCB</option>
            <option>SAMG</option>
            <option>REXI</option>
            <option>RAIL</option>
            <option>NSAM</option>
            <option>MITT</option>
            <option>LCM</option>
            <option>HASI</option>
            <option>GOL</option>
            <option>GIL</option>
            <option>EAD</option>
            <option>ATTO</option>
            <option>ATR</option>
            <option>ATNM</option>
            <option>ASTC</option>
            <option>ASR</option>
            <option>ASC</option>
            <option>ARTNA</option>
            <option>ARGS</option>
            <option>AOD</option>
            <option>AGNCP</option>
            <option>ADRO</option>
            <option>ACNB</option>
            <option>AAV</option>
            <option>AAT</option>
            <option>ZNH</option>
            <option>UAM</option>
            <option>NTT</option>
            <option>NFJ</option>
            <option>LNT</option>
            <option>KALU</option>
            <option>HOMB</option>
            <option>HIX</option>
            <option>FAF</option>
            <option>FAC</option>
            <option>EGT</option>
            <option>CAAS</option>
            <option>BGR</option>
            <option>BETR</option>
            <option>AUPH</option>
            <option>ATV</option>
            <option>ATLC</option>
            <option>AST</option>
            <option>ARIS</option>
            <option>ARCI</option>
            <option>APLE</option>
            <option>ANY</option>
            <option>ANIP</option>
            <option>AMSWA</option>
            <option>AMSF</option>
            <option>ALLT</option>
            <option>AKTX</option>
            <option>AGYS</option>
            <option>AGTC</option>
            <option>AFG</option>
            <option>ADDYY</option>
            <option>AAVL</option>
            <option>WAIR</option>
            <option>RESI</option>
            <option>LND</option>
            <option>LFL</option>
            <option>HRT</option>
            <option>ESD</option>
            <option>ECF</option>
            <option>DGLY</option>
            <option>CIK</option>
            <option>CII</option>
            <option>CHOP</option>
            <option>CCD</option>
            <option>CADC</option>
            <option>AYA</option>
            <option>AWRE</option>
            <option>AVV</option>
            <option>AVNW</option>
            <option>ATRM</option>
            <option>APPF</option>
            <option>AFFMQ</option>
            <option>AMRI</option>
            <option>AMCN</option>
            <option>AMCF</option>
            <option>ALTI</option>
            <option>ALLE</option>
            <option>AJRD</option>
            <option>AHH</option>
            <option>AGM</option>
            <option>AGII</option>
            <option>AFCB</option>
            <option>AEPI</option>
            <option>ADMA</option>
            <option>ABCW</option>
            <option>AAME</option>
            <option>TEO</option>
            <option>SRAQU</option>
            <option>SINO</option>
            <option>OMAB</option>
            <option>NOA</option>
            <option>NCZ</option>
            <option>MTT</option>
            <option>MHG</option>
            <option>JAGX</option>
            <option>ISL</option>
            <option>HIO</option>
            <option>GRR</option>
            <option>FAX</option>
            <option>ENL</option>
            <option>DIT</option>
            <option>CRMT</option>
            <option>CRESY</option>
            <option>CGA</option>
            <option>CAF</option>
            <option>ATRA</option>
            <option>ATEN</option>
            <option>ATEC</option>
            <option>ARLZ</option>
            <option>ARII</option>
            <option>ARDM</option>
            <option>ARDC</option>
            <option>ARCX</option>
            <option>APPS</option>
            <option>APHB</option>
            <option>ANW</option>
            <option>ANAT</option>
            <option>ANAD</option>
            <option>AKAO</option>
            <option>AGHI</option>
            <option>AETI</option>
            <option>AEB</option>
            <option>ADPT</option>
            <option>ADMP</option>
            <option>ACRS</option>
            <option>ACC</option>
            <option>ABEOW</option>
            <option>ABDC</option>
            <option>REX</option>
            <option>PAC</option>
            <option>NNA</option>
            <option>NAUH</option>
            <option>IGD</option>
            <option>HMNY</option>
            <option>GABC</option>
            <option>ERH</option>
            <option>EPAX</option>
            <option>CACQ</option>
            <option>BTI</option>
            <option>AXPW</option>
            <option>AWF</option>
            <option>AVX</option>
            <option>ASUR</option>
            <option>ASMB</option>
            <option>ASFI</option>
            <option>ASCMA</option>
            <option>ASCC</option>
            <option>ARES</option>
            <option>ARCP</option>
            <option>AQMS</option>
            <option>ANCB</option>
            <option>AMRC</option>
            <option>AMOV</option>
            <option>AKG</option>
            <option>AFW</option>
            <option>ACY</option>
            <option>ACPW</option>
            <option>ABIO</option>
            <option>AAC</option>
            <option>XKE</option>
            <option>VLRS</option>
            <option>PRA.AX</option>
            <option>TEAM</option>
            <option>SORL</option>
            <option>NEN</option>
            <option>NEA</option>
            <option>LMIA</option>
            <option>JEQ</option>
            <option>IGA</option>
            <option>IDE</option>
            <option>GBAB</option>
            <option>FWP</option>
            <option>EVTC</option>
            <option>CMGE</option>
            <option>CHY</option>
            <option>CADTU</option>
            <option>BTZ</option>
            <option>BAYN.DE</option>
            <option>AXU</option>
            <option>AWP</option>
            <option>ATE</option>
            <option>ATAI</option>
            <option>ARQL</option>
            <option>ARKR</option>
            <option>APP</option>
            <option>APLP</option>
            <option>APF</option>
            <option>APB</option>
            <option>AMRB</option>
            <option>AMBR</option>
            <option>ALU.PA</option>
            <option>ALQA</option>
            <option>ALOT</option>
            <option>AKER</option>
            <option>AIB</option>
            <option>AHPI</option>
            <option>AGRO</option>
            <option>AFST</option>
            <option>ADX</option>
            <option>ADGE</option>
            <option>ADAT</option>
            <option>ADAP</option>
            <option>ACU</option>
            <option>ACTS</option>
            <option>WJA.TO</option>
            <option>VLKAY</option>
            <option>TKC</option>
            <option>AQQSQ</option>
            <option>SCOK</option>
            <option>RZA</option>
            <option>PWX</option>
            <option>PRTS</option>
            <option>POPE</option>
            <option>PEO</option>
            <option>OASM</option>
            <option>NCV</option>
            <option>NBB</option>
            <option>NADL</option>
            <option>MHY</option>
            <option>MHF</option>
            <option>IOTS</option>
            <option>HYB</option>
            <option>GAM</option>
            <option>EOD</option>
            <option>EAGL</option>
            <option>DLA</option>
            <option>CBA</option>
            <option>BRKS</option>
            <option>AVK</option>
            <option>AUMAU</option>
            <option>AUBN</option>
            <option>ASYS</option>
            <option>ASA</option>
            <option>AMPH</option>
            <option>AMIC</option>
            <option>AMFW</option>
            <option>ALJJ</option>
            <option>ALDX</option>
            <option>AGR</option>
            <option>AGD</option>
            <option>AFC</option>
            <option>AFA</option>
            <option>AEY</option>
            <option>AEK</option>
            <option>ADVS</option>
            <option>ABUS</option>
            <option>ABLX.BR</option>
            <option>AAPC</option>
            <option>TANN</option>
            <option>SHOS</option>
            <option>RYAM</option>
            <option>RJETQ</option>
            <option>PAHC</option>
            <option>NAC</option>
            <option>MZA</option>
            <option>MGR</option>
            <option>HYI</option>
            <option>GNOW</option>
            <option>FWRD</option>
            <option>FEN</option>
            <option>FEI</option>
            <option>DAI.DE</option>
            <option>CHLN</option>
            <option>CALI</option>
            <option>AXON</option>
            <option>AXGN</option>
            <option>AVH</option>
            <option>AVAL</option>
            <option>AUMN</option>
            <option>ATL</option>
            <option>ASRVP</option>
            <option>ASRV</option>
            <option>ASBI</option>
            <option>ASBB</option>
            <option>ARTW</option>
            <option>APWC</option>
            <option>APAM</option>
            <option>AMS</option>
            <option>AMFC</option>
            <option>ALN</option>
            <option>AGFS</option>
            <option>AFGE</option>
            <option>AEMD</option>
            <option>ADNC</option>
            <option>ACV</option>
            <option>ACG</option>
            <option>ACBI</option>
            <option>ABTX</option>
            <option>AAMC</option>
            <option>UNAM</option>
            <option>TVE</option>
            <option>TVC</option>
            <option>SGF</option>
            <option>SCAI</option>
            <option>HVCW</option>
            <option>OMAM</option>
            <option>NSA</option>
            <option>NKG</option>
            <option>NAD</option>
            <option>MTGEP</option>
            <option>MPAA</option>
            <option>LDP</option>
            <option>JRI</option>
            <option>JAX</option>
            <option>IF</option>
            <option>GGM</option>
            <option>ETF</option>
            <option>EARS</option>
            <option>EADSY</option>
            <option>DMO</option>
            <option>DEX</option>
            <option>AZSEY</option>
            <option>AXX</option>
            <option>AXTI</option>
            <option>AVXS</option>
            <option>AUQ</option>
            <option>ATTU</option>
            <option>ATLO</option>
            <option>ASTE</option>
            <option>ASND</option>
            <option>ARL</option>
            <option>APTO</option>
            <option>AMTX</option>
            <option>AKP</option>
            <option>AI.PA</option>
            <option>AGIIL</option>
            <option>AFMD</option>
            <option>AFFY</option>
            <option>AFB</option>
            <option>AEUA</option>
            <option>ADEP</option>
            <option>ABIL</option>
            <option>ABAC</option>
            <option>WIW</option>
            <option>WGA</option>
            <option>TRAN.BA</option>
            <option>ICG.AX</option>
            <option>SBI</option>
            <option>RKDA</option>
            <option>PSF</option>
            <option>NAZ</option>
            <option>MNP</option>
            <option>MMU</option>
            <option>DLS.AX</option>
            <option>JTA</option>
            <option>IPCC</option>
            <option>IAF</option>
            <option>IAE</option>
            <option>GCP</option>
            <option>FTAI</option>
            <option>FNTCU</option>
            <option>FGB</option>
            <option>FCO</option>
            <option>EMD</option>
            <option>EAA</option>
            <option>DDAIF</option>
            <option>QED.L</option>
            <option>CHI</option>
            <option>CEE</option>
            <option>CADTW</option>
            <option>BUI</option>
            <option>AXSM</option>
            <option>ANOS</option>
            <option>ANCI</option>
            <option>ALTV</option>
            <option>ALAN</option>
            <option>AKZOY</option>
            <option>AKO-A</option>
            <option>AJX</option>
            <option>AGNCB</option>
            <option>AFSD</option>
            <option>AFH</option>
            <option>AEGG</option>
            <option>ACP</option>
            <option>ABRN</option>
            <option>CLA.AX</option>
            <option>WRN</option>
            <option>USA</option>
            <option>OXXCB.AX</option>
            <option>CBS.AX</option>
            <option>PHX</option>
            <option>NZH</option>
            <option>KYE</option>
            <option>KLREU</option>
            <option>JCE</option>
            <option>JBR</option>
            <option>JBK</option>
            <option>IGZ</option>
            <option>IGI</option>
            <option>HOPS</option>
            <option>HDRA</option>
            <option>GS.TO</option>
            <option>GRO</option>
            <option>GPACU</option>
            <option>GER</option>
            <option>ELEC</option>
            <option>EGIF</option>
            <option>DYSL</option>
            <option>CNLM</option>
            <option>CLAC</option>
            <option>CACG</option>
            <option>BTA</option>
            <option>BRSS</option>
            <option>BLVDW</option>
            <option>BLVD</option>
            <option>AYA.TO</option>
            <option>AVLY</option>
            <option>AUMAW</option>
            <option>ATP.TO</option>
            <option>ASMI</option>
            <option>ASKH</option>
            <option>ARUN</option>
            <option>AREN</option>
            <option>ARCPP</option>
            <option>AMSGP</option>
            <option>AMRH</option>
            <option>ALTX</option>
            <option>ALA.TO</option>
            <option>AKG.TO</option>
            <option>AIY</option>
            <option>AIR.PA</option>
            <option>AIMT</option>
            <option>AIF</option>
            <option>AERG</option>
            <option>AED</option>
            <option>ADXSW</option>
            <option>ACLZ</option>
            <option>ABX.TO</option>
            <option>ABAT</option>
            <option>AAAP</option>
            <option>6599.KL</option>
            <option>WIA</option>
            <option>WEA</option>
            <option>VKI</option>
            <option>VELCP.AX</option>
            <option>TRTLW</option>
            <option>TRTL</option>
            <option>SKAS</option>
            <option>SCD</option>
            <option>RUK</option>
            <option>ROIQ</option>
            <option>QPACW</option>
            <option>QPACU</option>
            <option>AMLH</option>
            <option>PZE</option>
            <option>PAI</option>
            <option>PAA.TO</option>
            <option>ORG.AX</option>
            <option>NXZ</option>
            <option>NORD</option>
            <option>NMA</option>
            <option>NKX</option>
            <option>NBRV</option>
            <option>MOG-A</option>
            <option>MAV</option>
            <option>LDF</option>
            <option>JSYNU</option>
            <option>JPI</option>
            <option>JBN</option>
            <option>HDRAW</option>
            <option>HDRAU</option>
            <option>HCACW</option>
            <option>GTATQ</option>
            <option>GPIAW</option>
            <option>GGZ</option>
            <option>GGACW</option>
            <option>GCH</option>
            <option>GAI</option>
            <option>FNTC</option>
            <option>FBGX</option>
            <option>EXD</option>
            <option>EHI</option>
            <option>EAE</option>
            <option>DRA</option>
            <option>DFP</option>
            <option>DDF</option>
            <option>CVB</option>
            <option>CS.PA</option>
            <option>CNLMR</option>
            <option>CLAD</option>
            <option>BLVDU</option>
            <option>BHAC</option>
            <option>BGY</option>
            <option>BBD-A.TO</option>
            <option>BAM-A.TO</option>
            <option>AVNU</option>
            <option>AVL</option>
            <option>AVL.TO</option>
            <option>ATH.TO</option>
            <option>ASG</option>
            <option>ARU</option>
            <option>AQA.TO</option>
            <option>ANZ.AX</option>
            <option>ANTX</option>
            <option>ANTM.JK</option>
            <option>ANSU</option>
            <option>ANRZQ</option>
            <option>ANDAU</option>
            <option>ALYI</option>
            <option>ALO.PA</option>
            <option>ALLM</option>
            <option>ALLB</option>
            <option>AIRT</option>
            <option>AIC</option>
            <option>AFFM</option>
            <option>ADN.L</option>
            <option>AC</option>
            <option>AC.PA</option>
            <option>ABI.BR</option>
            <option>ZERO</option>
            <option>XRF.AX</option>
            <option>WOW.AX</option>
            <option>WDI.DE</option>
            <option>WAT.AX</option>
            <option>VOLVY</option>
            <option>TRTLU</option>
            <option>TPZ</option>
            <option>ABEC</option>
            <option>SIEGY</option>
            <option>SDCJF</option>
            <option>ROIQW</option>
            <option>ROIQU</option>
            <option>QPAC</option>
            <option>QBE.AX</option>
            <option>ARN.V</option>
            <option>PAACR</option>
            <option>ORT.TO</option>
            <option>NZF</option>
            <option>NVX</option>
            <option>NVG</option>
            <option>NUW</option>
            <option>NIE</option>
            <option>MYHI</option>
            <option>MT.AS</option>
            <option>MHNB</option>
            <option>MDG.AX</option>
            <option>LAQ</option>
            <option>KED</option>
            <option>IAG.TO</option>
          </select>
        </div>

        {/* Graph */}
        <div className={`mt-4 ${tab === "graph" ? "" : "hidden"} `}>
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
              <h1 className="text-2xl font-bold">Monthly Time Series</h1>
            </div>
          )}
          {isGraphLoading && (
            <p className="w-full mt-20 mb-10 text-center text-gray-400 animate-pulse">
              Loading...Please wait...
            </p>
          )}
          <div
            className={`my-10 ${isGraphLoading ? "hidden" : ""}`}
            ref={chartContainer}
          ></div>
        </div>

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
                            <img className="w-2/6 rounded-md" src={newsFeed.banner_image} alt="" />
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
