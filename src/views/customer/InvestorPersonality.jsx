import React, { useEffect, useState } from "react";
import { Api } from "@api/Api.jsx";
import PieChart from "../../components/common/charts/PieChart";

export default function InvestorPersonality() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataExist, setIsDataExist] = useState(false);
  const [noOfDependents, setNoOfDependents] = useState(0);
  const [termInsuranceCover, setTermInsuranceCover] = useState(0);
  const [liabilitiesAmount, setLiabilitiesAmount] = useState(0);
  const [fixedDeposit, setFixedDeposit] = useState(0);
  const [salary, setSalary] = useState(0);
  const [medicalInsuranceCover, setMedicalInsuranceCover] = useState(0);
  const [disabilities, setDisabilities] = useState(null);
  const [stocksMutualFundInvestment, setStocksMutualFundInvestment] =
    useState(0);

  useEffect(() => {
    setTimeout(() => {
      Api.get("investment-profile/data")
        .then((response) => {
          if (response.data.no_of_dependents) {
            setIsDataExist(true);
            setIsLoading(false);

            setNoOfDependents(response.data.no_of_dependents);
            setTermInsuranceCover(response.data.term_insurance_cover);
            setLiabilitiesAmount(response.data.liabilities_amount);
            setFixedDeposit(response.data.fixed_deposit);
            setSalary(response.data.salary);
            setMedicalInsuranceCover(response.data.medical_insurance_cover);
            setDisabilities(response.data.disabilities);
            setStocksMutualFundInvestment(
              response.data.stocks_mutual_funds_investment
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 3000);
  }, []);

  function handleSubmit() {
    const payload = {
      no_of_dependents: parseInt(noOfDependents),
      term_insurance_cover: parseInt(termInsuranceCover),
      liabilities_amount: parseInt(liabilitiesAmount),
      fixed_deposit: parseInt(fixedDeposit),
      salary: parseInt(salary),
      medical_insurance_cover: parseInt(medicalInsuranceCover),
      disabilities: false,
      stocks_mutual_funds_investment: parseInt(stocksMutualFundInvestment),
    };

    Api.post("investment-profile/data", payload)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  function drawChart() {
    const data = {
      labels: [
        "Term Insurance Cover",
        "Liabilities Amount",
        "Fixed Deposit",
        "Salary",
        "Medical Insurance Cover",
        "Stock / Mutual Funds / Other",
      ],
      datasets: [
        {
          label: "Spending Personality Distribution",
          data: [
            termInsuranceCover,
            liabilitiesAmount,
            fixedDeposit,
            salary,
            medicalInsuranceCover,
            stocksMutualFundInvestment,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderColor: [
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
          ],
          borderWidth: 2,
        },
      ],
    };

    return <PieChart data={data} />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <p className="mt-4 text-sm text-gray-500">
        Profile <i className="fa-solid fa-angle-right fa-sm fa-fw"></i>
      </p>
      <h2 className="mt-1 text-2xl font-bold mb-4">Investor's Personality</h2>
      {isLoading && (
        <div className="mt-6 mb-4 text-center animate-pulse">
          Loading... Please wait...
        </div>
      )}

      {!isLoading && (
        <div className="flex gap-10">
          <div className="w-1/2">
            <div className="mt-2 flex flex-col">
              <label>No of dependents:</label>
              <input
                className="mt-1 px-2 py-2 border rounded-lg"
                type="number"
                placeholder="i.e. 4"
                value={noOfDependents}
                onChange={(e) => setNoOfDependents(e.target.value)}
              />
            </div>

            <div className="mt-2 flex flex-col">
              <label>Term Insurance cover amount:</label>
              <input
                className="mt-1 px-2 py-2 border rounded-lg"
                type="number"
                placeholder="i.e. 750"
                value={termInsuranceCover}
                onChange={(e) => setTermInsuranceCover(e.target.value)}
              />
            </div>

            <div className="mt-2 flex flex-col">
              <label>Liabilities amount</label>
              <input
                className="mt-1 px-2 py-2 border rounded-lg"
                type="number"
                placeholder="i.e. 12000"
                value={liabilitiesAmount}
                onChange={(e) => setLiabilitiesAmount(e.target.value)}
              />
            </div>

            <div className="mt-2 flex flex-col">
              <label>Fixed deposits</label>
              <input
                className="mt-1 px-2 py-2 border rounded-lg"
                type="number"
                placeholder="i.e. 12000"
                value={fixedDeposit}
                onChange={(e) => setFixedDeposit(e.target.value)}
              />
            </div>

            <div className="mt-2 flex flex-col">
              <label>Salary:</label>
              <input
                className="mt-1 px-2 py-2 border rounded-lg"
                type="number"
                placeholder="i.e. 82000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div className="mt-2 flex flex-col">
              <label>Medical Insurance cover:</label>
              <input
                className="mt-1 px-2 py-2 border rounded-lg"
                type="number"
                placeholder="i.e. 82000"
                value={medicalInsuranceCover}
                onChange={(e) => setMedicalInsuranceCover(e.target.value)}
              />
            </div>

            <div className="mt-2 flex flex-col">
              <label>Disabilities:</label>
              <div className="flex space-x-10">
                <div>
                  <input
                    name="disabilities"
                    type="radio"
                    value={disabilities}
                    onChange={(e) => setDisabilities(true)}
                    checked={disabilities}
                  />{" "}
                  Yes
                </div>
                <div>
                  <input
                    name="disabilities"
                    type="radio"
                    value={!disabilities}
                    onChange={(e) => setDisabilities(false)}
                    checked={!disabilities}
                  />{" "}
                  No
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-col">
              <label>Stocks / Mutual Funds / Other:</label>
              <input
                className="mt-1 px-2 py-2 border rounded-lg"
                type="number"
                placeholder="i.e. 500000"
                value={stocksMutualFundInvestment}
                onChange={(e) => setStocksMutualFundInvestment(e.target.value)}
              />
            </div>

            <button
              className="w-full font-semibold mt-6 px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="w-1/2">{isDataExist && drawChart()}</div>
        </div>
      )}
    </div>
  );
}
