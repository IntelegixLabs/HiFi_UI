export const transform = (data, type = "") => {
  const transformedData = {
    meta_data: {
      Information: data["Meta Data"]["1. Information"],
      Symbol: data["Meta Data"]["2. Symbol"],
      LastRefreshed: data["Meta Data"]["3. Last Refreshed"],
      TimeZone: data["Meta Data"]["4. Time Zone"],
    },
    intraday_time_series: [],
    daily_time_series: [],
    weekly_time_series: [],
    monthly_time_series: [],
  };

  let intradayTimeSeries = [];
  let dailyTimeSeries = [];
  let weeklyTimeSeries = [];
  let monthlyTimeSeries = [];

  if (type === "intraday") {
    for (const date in data["Time Series (1min)"]) {
      intradayTimeSeries.push({
        time: date.split(" ")[1].slice(0, 5),
        open: Number(data["Time Series (1min)"][date]["1. open"]),
        high: Number(data["Time Series (1min)"][date]["2. high"]),
        low: Number(data["Time Series (1min)"][date]["3. low"]),
        close: Number(data["Time Series (1min)"][date]["4. close"]),
      });
    }
    // intradayTimeSeries.sort((a, b) => new Date(a.time) - new Date(b.time));

    // intradayTimeSeries.sort((a, b) => new Date(a.time.replace(' ', 'T')) - new Date(b.time.replace(' ', 'T')));

    // intradayTimeSeries.sort((a, b) => {
    //   const timeA = a.time.split(" ")[1].slice(0, 5);
    //   const timeB = b.time.split(" ")[1].slice(0, 5);
    //   return timeA.localeCompare(timeB);
    // });

    transformedData.intraday_time_series = intradayTimeSeries;

    return transformedData;
  }

  if (type === "daily") {
    for (const date in data["Time Series (Daily)"]) {
      dailyTimeSeries.push({
        time: date,
        open: Number(data["Time Series (Daily)"][date]["1. open"]),
        high: Number(data["Time Series (Daily)"][date]["2. high"]),
        low: Number(data["Time Series (Daily)"][date]["3. low"]),
        close: Number(data["Time Series (Daily)"][date]["4. close"]),
      });
    }
    dailyTimeSeries.sort((a, b) => new Date(a.time) - new Date(b.time));

    transformedData.daily_time_series = dailyTimeSeries;

    return transformedData;
  }

    if (type === "weekly") {
      for (const date in data["Weekly Time Series"]) {
        weeklyTimeSeries.push({
          time: date,
          open: Number(data["Weekly Time Series"][date]["1. open"]),
          high: Number(data["Weekly Time Series"][date]["2. high"]),
          low: Number(data["Weekly Time Series"][date]["3. low"]),
          close: Number(data["Weekly Time Series"][date]["4. close"]),
        });
      }
      weeklyTimeSeries.sort((a, b) => new Date(a.time) - new Date(b.time));

      transformedData.weekly_time_series = weeklyTimeSeries;

      return transformedData;
    }

      if (type === "monthly" || type === "") {
        for (const date in data["Monthly Time Series"]) {
          monthlyTimeSeries.push({
            time: date,
            open: Number(data["Monthly Time Series"][date]["1. open"]),
            high: Number(data["Monthly Time Series"][date]["2. high"]),
            low: Number(data["Monthly Time Series"][date]["3. low"]),
            close: Number(data["Monthly Time Series"][date]["4. close"]),
          });
        }
        monthlyTimeSeries.sort((a, b) => new Date(a.time) - new Date(b.time));

        transformedData.monthly_time_series = monthlyTimeSeries;

        return transformedData;
      }
};

export const autoFormatCurrency = (data) => {
  if (data >= 1e12) {
    return (data / 1e12).toFixed(2) + " T";
  } else if (data >= 1e9) {
    return (data / 1e9).toFixed(2) + " B";
  } else if (data >= 1e6) {
    return (data / 1e6).toFixed(2) + " M";
  } else if (data >= 1e3) {
    return (data / 1e3).toFixed(2) + " K";
  } else {
    return data.toFixed(2);
  }
};

export const autoFormatCurrencyInShortValues = (data) => {
  let valueInMillions = data / 1000000;
  let formattedValue = valueInMillions.toFixed(2);
  return formattedValue;
};
