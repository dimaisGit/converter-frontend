import React from 'react'
import CountUp from 'react-countup';
import { excelDateToJSDate } from "../scripts/helpers";

class TeamResult extends React.Component {
  render() {
    const { teamName, percent, topWin, topLoose } = this.props;
    let topWinDate = excelDateToJSDate(topWin)
    let topLooseDate = excelDateToJSDate(topLoose)
    return (
      <div className='team-result'>
        { percent &&
          <>
            <h1>{teamName}</h1>
            <p>WINS:</p>
            <CountUp
              start={0}
              end={percent}
              duration={5}
              suffix={" %"}
            />
            <p>TOP WIN DATE:</p>
            <span>{topWinDate}</span>
            <p>TOP LOOSE DATE:</p>
            <span>{topLooseDate}</span>
          </>
        }
      </div>
    )
  }
}

export default TeamResult;