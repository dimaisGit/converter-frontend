import React from 'react'
import { excelDateToJSDate } from "../scripts/helpers";

class Table extends React.Component {
  render() {
    const { data, dateName, team1Name, team2Name } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>{dateName}</th>
            <th>{team1Name}</th>
            <th>{team2Name}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => <tr key={index}>
                <td>{excelDateToJSDate(row[dateName])}</td>
                <td>{row[team1Name]}</td>
                <td>{row[team2Name]}</td>
              </tr>)}
        </tbody>
      </table>
    )
  }
}

export default Table;
