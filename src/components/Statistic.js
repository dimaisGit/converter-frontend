import React from 'react'
import CanvasJSReact from "../scripts/canvasjs.react";
import TeamResult from "./TeamResult";
import Table from "./Table";
let { CanvasJSChart} = CanvasJSReact

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ''
    }
  }

  componentDidMount() {
    console.log(this.props);
    const { parsedData } = this.props;
    const { stringNames, data } = parsedData

    let dateName = stringNames[0];

    let team1Name = stringNames[1];
    let team2Name = stringNames[2];


    let team1Wins = 0;
    let team2Wins = 0;

    let maxDiffTeam1Win = 0;
    let maxDiffTeam2Win = 0;

    let maxDiffTeam1Loose = 0;
    let maxDiffTeam2Loose = 0;

    let topLooseTeam1 = '';
    let topLooseTeam2 = '';

    let topWinTeam1 = '';
    let topWinTeam2 = '';
    data.map( row => {
      if (row[team1Name] > row[team2Name]) {
        team1Wins++;
        let diff = row[team1Name] - row[team2Name];
        if (diff > maxDiffTeam1Win) {
          maxDiffTeam1Win = diff;
          topWinTeam1 = row[dateName];
        }
        if (diff > maxDiffTeam2Loose) {
          maxDiffTeam2Loose = diff;
          topLooseTeam2 = row[dateName];
        }
      } else {
        team2Wins++;
        let diff = row[team2Name] - row[team1Name];
        if (diff > maxDiffTeam2Win) {
          maxDiffTeam2Win = diff;
          topWinTeam2 = row[dateName];
        }
        if (diff > maxDiffTeam1Loose) {
          maxDiffTeam1Loose = diff;
          topLooseTeam1 = row[dateName]
        }
      }
    })
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "-WOW- FOOTBAL STATISTIC -WOW-"
      },
      theme: 'dark2',
      data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} побед(победы)",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y} побед(победы)",
        dataPoints: [
          { y: team1Wins, label: team1Name },
          { y: team2Wins, label: team2Name }
        ]
      }]
    }
    this.setState({
      options: options,
      dateName: dateName,
      team1Name: team1Name,
      team2Name: team2Name,
      team1Wins: team1Wins,
      team2Wins: team2Wins,
      topWinTeam1: topWinTeam1,
      topWinTeam2: topWinTeam2,
      topLooseTeam1: topLooseTeam1,
      topLooseTeam2: topLooseTeam2
    })
  }

  render() {
    const { options, team1Name, team2Name, team1Wins, team2Wins, topWinTeam1, topWinTeam2, topLooseTeam1, topLooseTeam2, dateName } = this.state
    return (
      <div className='statistic'>
        { options &&
          <CanvasJSChart options={options} />
        }
        <div className='results'>
          <TeamResult
            teamName={team1Name}
            percent={parseInt(team1Wins / (team1Wins + team2Wins) * 100)}
            topWin={topWinTeam1}
            topLoose={topLooseTeam1}
          />
          <TeamResult
            teamName={team2Name}
            percent={parseInt(team2Wins / (team1Wins + team2Wins) * 100)}
            topWin={topWinTeam2}
            topLoose={topLooseTeam2}
          />

          <Table
            data={this.props.parsedData.data}
            dateName={dateName}
            team1Name={team1Name}
            team2Name={team2Name}
          />

        </div>
      </div>
    )
  }
}

export default Statistic;