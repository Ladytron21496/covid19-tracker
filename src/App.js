import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Infoboxes from "./infoboxes";
import Select from "@material-ui/core/Select";
import Linechart from "./chart";
import News from "./news";
import Table from "./table";
import { useEffect, useState } from "react";
import Map from "./map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [activeBox, setActiveBox] = useState("Coronavirus Cases");
  const [infoboxData, setInfoBoxData] = useState({
    todayCases: null,
    todayRecovered: null,
    todayDeaths: null,
    totalCases: null,
    totalRecovery: null,
    totalDeaths: null,
    lastUpdated: null,
  });
  const [tableData, setTableData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [cords, setCords] = useState([50, 20]);

  function getCasesType() {
    if (activeBox === "Coronavirus Cases") {
      return "cases";
    } else if (activeBox === "Recovered") {
      return "recovered";
    } else {
      return "deaths";
    }
  }

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
            updated,
          } = data;
          setInfoBoxData({
            todayCases,
            todayDeaths,
            todayRecovered,
            totalCases: cases,
            totalDeaths: deaths,
            totalRecovery: recovered,
            lastUpdated: updated,
          });
        });
      setCords([50, 20]);
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
        updated,
        countryInfo,
      } = selectedCountryData[0];
      setInfoBoxData({
        todayCases,
        todayDeaths,
        todayRecovered,
        totalCases: cases,
        totalDeaths: deaths,
        totalRecovery: recovered,
        lastUpdated: updated,
      });

      let { lat, long } = countryInfo;
      let cords = [lat, long];
      setCords(cords);
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
              handleOnClick={(title) => setActiveBox(title)}
              isActive={activeBox}
              lastUpdated={infoboxData.lastUpdated}
              title="Coronavirus Cases"
              cases={infoboxData.todayCases}
              total={infoboxData.totalCases}
            />
            <Infoboxes
              handleOnClick={(title) => setActiveBox(title)}
              isActive={activeBox}
              lastUpdated={infoboxData.lastUpdated}
              title="Recovered"
              cases={infoboxData.todayRecovered}
              total={infoboxData.totalRecovery}
            />
            <Infoboxes
              handleOnClick={(title) => setActiveBox(title)}
              isActive={activeBox}
              lastUpdated={infoboxData.lastUpdated}
              title="Deaths"
              cases={infoboxData.todayDeaths}
              total={infoboxData.totalDeaths}
            />
          </div>
          <div className="app-map">
            <Map
              active={activeBox}
              activeCountry={selectedCountry}
              countryData={countries}
              cords={cords}
            />
          </div>
        </div>
        <div className="app-right">
          <div className="app-right-table">
            <Table tableData={tableData} />
          </div>

          <Linechart
            title={activeBox}
            casesType={getCasesType()}
            countryType={selectedCountry}
          />
        </div>
      </div>
      <div className="news-app">
        <News />
      </div>
    </>
  );
}

export default App;
