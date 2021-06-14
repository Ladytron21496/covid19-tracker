import { Card, Typography } from "@material-ui/core";
import { FaCaretUp } from "react-icons/fa";
import numeral from "numeral";
const moment = require("moment");

function formatTime(timestamp) {
  return moment(timestamp).format("LLL");
}

function Infobox(props) {
  let { title, cases, total, lastUpdated, isActive, handleOnClick } = props;

  function getClassNames() {
    if (title === "Coronavirus Cases" && isActive === "Coronavirus Cases") {
      return "box activeBoxCases";
    } else if (title === "Recovered" && isActive === "Recovered") {
      return "box recoveredCases";
    } else if (title === "Deaths" && isActive === "Deaths") {
      return " box deathCases";
    }
    return "box";
  }

  function handleClick(title) {
    handleOnClick(title);
  }

  return (
    <>
      <Card onClick={() => handleClick(title)} className={getClassNames()}>
        <Typography variant="h6" color="textPrimary">
          {title}
        </Typography>
        <Typography
          style={{ fontWeight: "bolder" }}
          variant="subtitle1"
          color="textPrimary"
        >
          {title === "Coronavirus Cases" && (
            <FaCaretUp
              style={{
                color: "red",
                fontSize: "20px",
                position: "relative",
                top: "2px",
              }}
            />
          )}
          {title === "Recovered" && (
            <FaCaretUp
              style={{
                color: "green",
                fontSize: "20px",
                position: "relative",
                top: "2px",
              }}
            />
          )}
          {title === "Deaths" && (
            <FaCaretUp
              style={{
                color: "darkgray",
                fontSize: "20px",
                position: "relative",
                top: "2px",
              }}
            />
          )}
          {numeral(cases).format("0,0")}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">{`Total : ${numeral(
          total
        ).format("0.0a")}`}</Typography>
        <Typography
          color="textPrimary"
          style={{ fontSize: "13.5px" }}
          variant="p"
        >
          Last Updated : <b>{formatTime(lastUpdated)}</b>
        </Typography>
      </Card>
    </>
  );
}

export default Infobox;
