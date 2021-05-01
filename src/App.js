import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Infoboxes from "./infoboxes";
import Select from "@material-ui/core/Select";
import Linechart from "./chart";
import Table from "./table";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [infoboxData, setInfoBoxData] = useState({
    todayCases: null,
    todayRecovered: null,
    todayDeaths: null,
    totalCases: null,
    totalRecovery: null,
    totalDeaths: null,
  });
  const [tableData, setTableData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setTableData(data);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry === "worldwide") {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((data) => {
          let {
            cases,
            deaths,
            recovered,
            todayCases,
            todayDeaths,
            todayRecovered,
          } = data;
          setInfoBoxData({
            todayCases,
            todayDeaths,
            todayRecovered,
            totalCases: cases,
            totalDeaths: deaths,
            totalRecovery: recovered,
          });
        });
    } else {
      let selectedCountryData = tableData.filter((item) => {
        return item.country === selectedCountry;
      });
      console.log("this is selected country data", selectedCountryData);
      let {
        cases,
        deaths,
        recovered,
        todayCases,
        todayDeaths,
        todayRecovered,
      } = selectedCountryData[0];
      setInfoBoxData({
        todayCases,
        todayDeaths,
        todayRecovered,
        totalCases: cases,
        totalDeaths: deaths,
        totalRecovery: recovered,
      });
    }
  }, [selectedCountry]);

  const handleDropDownChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <>
      <div className="app">
        <div className="app-left">
          <div className="app-header">
            <h1>COVID 19 TRACKER</h1>
            <FormControl>
              <Select
                defaultValue="worldwide"
                variant="outlined"
                value={selectedCountry}
                onChange={handleDropDownChange}
              >
                <MenuItem key="worldwide" value="worldwide">
                  Worldwide
                </MenuItem>
                {countries.length > 0 &&
                  countries
                    .sort((a, b) => {
                      return a.country > b.country ? -1 : 1;
                    })
                    .map((item) => {
                      return (
                        <MenuItem key={item.country} value={item.country}>
                          {item.country}
                        </MenuItem>
                      );
                    })}
              </Select>
            </FormControl>
          </div>
          <div className="app-infoboxes">
            <Infoboxes
              title="Coronavirus Cases"
              cases={infoboxData.todayCases}
              total={infoboxData.totalCases}
            />
            <Infoboxes
              title="Recovered"
              cases={infoboxData.todayRecovered}
              total={infoboxData.totalRecovery}
            />
            <Infoboxes
              title="Deaths"
              cases={infoboxData.todayDeaths}
              total={infoboxData.totalDeaths}
            />
          </div>
        </div>
        <div className="app-right">
          <div className="app-right-table">
            <Table tableData={tableData} />
          </div>

          <Linechart countryType={selectedCountry} />
        </div>
      </div>
      <div style={{ height: "100vh", marginTop: "10vh" }}>Vaccine info</div>
    </>
  );
}

export default App;
