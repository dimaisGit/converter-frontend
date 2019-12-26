import React from 'react'

class Table extends React.Component {
  render() {
    const { data, dateName, team1Name, team2Name } = this.props;
    return (
      <table>
        <thead>
          <th>{dateName}</th>
          <th>{team1Name}</th>
          <th>{team2Name}</th>
        </thead>
          {data.map(row => <tr>
                <td>{row[dateName]}</td>
                <td>{row[team1Name]}</td>
                <td>{row[team2Name]}</td>
              </tr>)}
      </table>
    )
  }
}

export default Table;