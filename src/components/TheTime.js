import React from "react"

const TheTime = props => {
  const { timeTable } = props
  const time = timeTable[0].time
  const realTime = timeTable[0].rtTime
  return (
    <div className="TheTime">
      <div className="TheTimeBlock" />
      <div className="TheTimeBlock">
        <h1 className="nextBusTime">{time}</h1>
      </div>
      <div className="TheTimeBlock">
        {time !== realTime || true ? (
          <h2 className="realTime">({realTime})</h2>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default TheTime
