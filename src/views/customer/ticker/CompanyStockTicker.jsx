import React, { Fragment } from "react";
import Marquee from "react-fast-marquee";

export default function CompanyStockTicker({ direction="right" }) {
  const company_ticker = [
    {
      ticker: "AAPL",
      company_name: "Apple Inc.",
      price: 150.25,
      market_change: 0.75,
      volume: 23546500,
    },
    {
      ticker: "MSFT",
      company_name: "Microsoft Corporation",
      price: 260.5,
      market_change: -0.25,
      volume: 19875400,
    },
    {
      ticker: "GOOGL",
      company_name: "Alphabet Inc.",
      price: 2800.75,
      market_change: 1.2,
      volume: 1503250,
    },
    {
      ticker: "AMZN",
      company_name: "Amazon.com Inc.",
      price: 3500.0,
      market_change: -0.5,
      volume: 1201750,
    },
    {
      ticker: "TSLA",
      company_name: "Tesla, Inc.",
      price: 680.75,
      market_change: 2.3,
      volume: 3508650,
    },
    {
      ticker: "FB",
      company_name: "Meta Platforms, Inc.",
      price: 320.6,
      market_change: 0.9,
      volume: 8452000,
    },
    {
      ticker: "NVDA",
      company_name: "NVIDIA Corporation",
      price: 450.8,
      market_change: 1.8,
      volume: 5543200,
    },
    {
      ticker: "BABA",
      company_name: "Alibaba Group Holding Limited",
      price: 200.45,
      market_change: -0.7,
      volume: 6521000,
    },
    {
      ticker: "JPM",
      company_name: "JPMorgan Chase & Co.",
      price: 160.3,
      market_change: -0.15,
      volume: 7548000,
    },
    {
      ticker: "V",
      company_name: "Visa Inc.",
      price: 250.1,
      market_change: 0.35,
      volume: 3906200,
    },
    {
      ticker: "PYPL",
      company_name: "PayPal Holdings, Inc.",
      price: 220.75,
      market_change: 0.5,
      volume: 4127500,
    },
    {
      ticker: "CRM",
      company_name: "Salesforce.com, Inc.",
      price: 240.2,
      market_change: -0.1,
      volume: 2654800,
    },
    {
      ticker: "NFLX",
      company_name: "Netflix, Inc.",
      price: 550.25,
      market_change: 0.25,
      volume: 3154800,
    },
    {
      ticker: "PG",
      company_name: "Procter & Gamble Company",
      price: 140.7,
      market_change: 0.4,
      volume: 2156300,
    },
    {
      ticker: "KO",
      company_name: "The Coca-Cola Company",
      price: 60.8,
      market_change: 0.2,
      volume: 5489200,
    },
    {
      ticker: "NKE",
      company_name: "NIKE, Inc.",
      price: 170.9,
      market_change: -0.05,
      volume: 4105700,
    },
    {
      ticker: "DIS",
      company_name: "The Walt Disney Company",
      price: 180.45,
      market_change: 0.6,
      volume: 7853200,
    },
    {
      ticker: "HD",
      company_name: "The Home Depot, Inc.",
      price: 330.25,
      market_change: 1.1,
      volume: 4859600,
    },
    {
      ticker: "UNH",
      company_name: "UnitedHealth Group Incorporated",
      price: 400.8,
      market_change: 0.85,
      volume: 3104700,
    },
    {
      ticker: "BAC",
      company_name: "Bank of America Corporation",
      price: 45.9,
      market_change: 0.3,
      volume: 9548700,
    },
    {
      ticker: "CSCO",
      company_name: "Cisco Systems, Inc.",
      price: 55.25,
      market_change: 0.15,
      volume: 6325800,
    },
    {
      ticker: "INTC",
      company_name: "Intel Corporation",
      price: 60.5,
      market_change: -0.2,
      volume: 5187600,
    },
    {
      ticker: "VZ",
      company_name: "Verizon Communications Inc.",
      price: 55.75,
      market_change: 0.05,
      volume: 7543200,
    },
    {
      ticker: "WMT",
      company_name: "Walmart Inc.",
      price: 140.2,
      market_change: 0.7,
      volume: 6524800,
    },
    {
      ticker: "XOM",
      company_name: "Exxon Mobil Corporation",
      price: 65.35,
      market_change: -0.4,
      volume: 10254800,
    },
    {
      ticker: "T",
      company_name: "AT&T Inc.",
      price: 28.75,
      market_change: 0.1,
      volume: 12536800,
    },
    {
      ticker: "PFE",
      company_name: "Pfizer Inc.",
      price: 40.6,
      market_change: 0.2,
      volume: 8459600,
    },
    {
      ticker: "CVS",
      company_name: "CVS Health Corporation",
      price: 85.2,
      market_change: 0.45,
      volume: 5623700,
    },
    {
      ticker: "MRK",
      company_name: "Merck & Co., Inc.",
      price: 75.8,
      market_change: 0.3,
      volume: 4125800,
    },
    {
      ticker: "COST",
      company_name: "Costco Wholesale Corporation",
      price: 450.3,
      market_change: 0.8,
      volume: 2157800,
    },
    {
      ticker: "BA",
      company_name: "The Boeing Company",
      price: 200.9,
      market_change: 0.25,
      volume: 3189500,
    },
  ];

  return (
    <Fragment>
      <Marquee gradient="true" direction={direction} pauseOnHover="true">
        <div className="flex space-x-4">
          {company_ticker.map((company, index) => {
            return (
                <div title={company.company_name} className="p-2 text-sm flex space-x-2 rounded-lg" key={index}>
                  <span className="font-semibold">{company.ticker}</span>
                  <span className="text-gray-500">{company.price}</span>
                  <span
                    className={`${
                      company.market_change > 0
                        ? "text-green-500"
                        : "text-red-400"
                    }`}
                  >
                    {company.market_change} %
                  </span>
                </div>
            );
          })}
        </div>
      </Marquee>
    </Fragment>
  );
}
