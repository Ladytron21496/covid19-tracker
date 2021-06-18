import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import Circledata from "./circledata";
import numeral from "numeral";
import { Card } from "@material-ui/core";

const circleType = {
  cases: {
    color: "crimson",
    multiplier: 10000,
  },
  recovered: {
    color: "limegreen",
    multiplier: 20000,
  },
  deaths: {
    color: "darkgray",
    multiplier: 30000,
  },
};

function ChangeView({ center, zoom, changedItem }) {
  const map = useMap();
  if (changedItem.toLowerCase() === "worldwide") {
    map.setView(center, 4.5);
    return null;
  } else {
    map.setView(center, 4.5);
    return null;
  }
}

function circleMaker(countryData, active) {
  let casesType;
  let multiplier;
  let color;

  if (active === "Coronavirus Cases") {
    casesType = "cases";
    multiplier = circleType.cases.multiplier;
    color = circleType.cases.color;
  } else if (active === "Recovered") {
    casesType = "recovered";
    multiplier = circleType.recovered.multiplier;
    color = circleType.recovered.color;
  } else {
    casesType = "deaths";
    multiplier = circleType.deaths.multiplier;
    color = circleType.deaths.color;
  }

  function GeneratePopUpData(country) {
    let obj = {};
    if (active === "Coronavirus Cases") {
      obj["title"] = "Today's Cases";
      obj["stitle"] = "Total Cases";
      obj["ptitle"] = "Cases Per One Million";
      obj["cases"] = country.cases;
      obj["todayCases"] = country.todayCases;
      obj["casesPerMillion"] = country.activePerOneMillion;
    } else if (active === "Recovered") {
      obj["title"] = "Today's Recoveries";
      obj["stitle"] = "Total Recoveries";
      obj["ptitle"] = "Recoveries Per One Million";
      obj["cases"] = country.recovered;
      obj["todayCases"] = country.todayRecovered;
      obj["casesPerMillion"] = country.recoveredPerOneMillion;
    } else {
      obj["title"] = "Today's Deaths";
      obj["stitle"] = "Total Deaths";
      obj["ptitle"] = "Deaths Per One Million";
      obj["cases"] = country.deaths;
      obj["todayDeaths"] = country.todayDeaths;
      obj["casesPerMillion"] = country.deathsPerOneMillion;
    }

    return (
      <>
        <p className="popup-data">{`${obj["title"]} : ${numeral(
          obj["todayCases"]
        ).format("0,0")}`}</p>
        <p className="popup-data">{`${obj["stitle"]} : ${numeral(
          obj["cases"]
        ).format("0,0")}`}</p>
        <p className="popup-data">{`${obj["ptitle"]} : ${numeral(
          obj["casesPerMillion"]
        ).format("0,0")}`}</p>
      </>
    );
  }

  let test = countryData.map((item) => {
    let { countryInfo } = item;
    let openPopup = false;
    if (item.country === "India") openPopup = true;
    let { lat, long } = countryInfo;
    return (
      <>
        <Circle
          key={item.country}
          pathOptions={{
            color: color,
            fillColor: color,
          }}
          center={[lat, long]}
          radius={Math.sqrt(item[casesType] * multiplier) * 1.2}
        >
          <Popup>
            <div className="popup-container">
              <div className="popup-left">
                <img className="popup-flag" src={countryInfo.flag}></img>
                <p style={{ margin: "5px 0px 0px 0px" }}>{item.country}</p>
              </div>
              <div className="popup-right">{GeneratePopUpData(item)}</div>
            </div>
          </Popup>
        </Circle>
      </>
    );
  });

  return test;
}

function Map(props) {
  let { cords, countryData, activeCountry, active } = props;

  return (
    <Card className="map-card">
      <MapContainer center={cords} zoom={1} scrollWheelZoom={false}>
        <ChangeView center={cords} changedItem={activeCountry} zoom={4.5} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        />
        {circleMaker(countryData, active)}
      </MapContainer>
    </Card>
  );
}

export default Map;
