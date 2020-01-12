import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faExchangeAlt } from "@fortawesome/free-solid-svg-icons"

const FromTo = props => {
  const { handleSwap, from, destination } = props
  return (
    <div className="fromToWrapper">
      <div className="fromTo">
        <h3 className="from" onClick={handleSwap}>
          {from.name}
        </h3>{" "}
        <FontAwesomeIcon
          className="exchangeArrows"
          onClick={handleSwap}
          icon={faExchangeAlt}
        />
        <h3 className="to">{destination.name}</h3>
      </div>
    </div>
  )
}

export default FromTo
