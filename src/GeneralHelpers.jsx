export const transform = (data) => {
  const transformedData = {
    meta_data: {
      Information: data["Meta Data"]["1. Information"],
      Symbol: data["Meta Data"]["2. Symbol"],
      LastRefreshed: data["Meta Data"]["3. Last Refreshed"],
      TimeZone: data["Meta Data"]["4. Time Zone"],
    },
    monthly_time_series: [],
  };

  let monthlyTimeSeries = [];

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
