import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { Card } from "@material-ui/core";

const options = {
  plugins: {
    legend: {
      display: false,
    },
    maintainAspectRatio: true,
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType = "cases", countryType = "worldwide" }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetch(
        `https://disease.sh/v3/covid-19/historical/${
          countryType === "worldwide" ? "all" : countryType
        }?lastdays=30`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData =
            countryType === "worldwide"
              ? buildChartData(data, casesType)
              : buildChartData(data.timeline, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
    setLoading(false);
  }, [casesType, countryType]);

  return (
    <>
      {loading ? (
        <p>Loading Data....</p>
      ) : (
        <div className="chart-container">
          <Card>
            {data?.length > 0 && (
              <Line
                data={{
                  datasets: [
                    {
                      backgroundColor: "rgba(204, 16, 52, 0.5)",
                      borderColor: "#CC1034",
                      data: data,
                    },
                  ],
                }}
                options={options}
              />
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default LineGraph;
