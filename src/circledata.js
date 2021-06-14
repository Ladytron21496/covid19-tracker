import { Popup, Circle } from "react-leaflet";
import { useRef, useEffect } from "react";
import numeral from "numeral";

function GeneratePopUpData(country, active) {
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

export default function Circledata(props) {
  let { lat, long, item, casesType, multiplier, color, active, openPopup } =
    props;
  let { countryInfo } = item;
  const markerRef = useRef(null);

  // useEffect(() => {
  //   if (openPopup) markerRef.current.leafletElement.openPopup();
  // }, [openPopup]);

  return (
    <Circle
      ref={markerRef}
      pathOptions={{
        color: color,
        fillColor: color,
      }}
      center={[lat, long]}
      radius={Math.sqrt(casesType * multiplier) * 1.2}
    >
      <Popup>
        <div className="popup-container">
          <div className="popup-left">
            <img className="popup-flag" src={countryInfo.flag}></img>
            <p style={{ margin: "5px 0px 0px 0px" }}>{item.country}</p>
          </div>
          <div className="popup-right">{GeneratePopUpData(item, active)}</div>
        </div>
      </Popup>
    </Circle>
  );
}
