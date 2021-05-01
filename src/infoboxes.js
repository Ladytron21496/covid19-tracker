import { Card, Typography } from "@material-ui/core";
import numeral from "numeral";
function Infobox(props) {
  let { title, cases, total } = props;

  return (
    <>
      <Card className="box">
        <Typography variant="h6" color="textPrimary">
          {title}
        </Typography>
        <Typography
          style={{ fontWeight: "bolder" }}
          variant="subtitle1"
          color="textPrimary"
        >
          {numeral(cases).format("0.0a")}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">{`Total : ${numeral(
          total
        ).format("0.0a")}`}</Typography>
      </Card>
    </>
  );
}

export default Infobox;
