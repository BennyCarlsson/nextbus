import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBus } from "@fortawesome/free-solid-svg-icons"

const NextTimes = props => {
  const { timeTable } = props
  return (
    <div>
      <p>
        <FontAwesomeIcon className="busIcon" icon={faBus} />
        {timeTable[1].time}
      </p>
      <p>
        <FontAwesomeIcon className="busIcon" icon={faBus} />
        {timeTable[2].time}
      </p>
      <p>
        <FontAwesomeIcon className="busIcon" icon={faBus} />
        {timeTable[3].time}
      </p>
    </div>
  )
}

export default NextTimes
