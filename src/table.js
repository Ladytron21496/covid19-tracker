import { Card } from "@material-ui/core";
import { sortByCases } from "./utils";
import numeral from "numeral";
function Table(props) {
  let { tableData } = props;
  let computedtableData = sortByCases(tableData);
  return (
    <Card>
      <h4 className="table-title">Live Cases By Country</h4>
      <div className="table">
        {computedtableData?.map((item) => {
          return (
            <>
              <tr className="table-row">
                <td className="table-data">{item.country}</td>
                <td className="table-data">
                  {numeral(item.cases).format("0,0")}
                </td>
              </tr>
            </>
          );
        })}
      </div>
    </Card>
  );
}

export default Table;
