import React from 'react'
import CountUp from 'react-countup';

class TeamResult extends React.Component {
  render() {
    const { teamName, percent, topWin, topLoose } = this.props;
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
            <span>{topWin}</span>
            <p>TOP LOOSE DATE:</p>
            <span>{topLoose}</span>
          </>
        }
      </div>
    )
  }
}

export default TeamResult;