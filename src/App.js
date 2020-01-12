import React, { useEffect, useState, useCallback } from "react"
import "./App.css"
import { getData } from "./utils"
import { partillePort, nordstan } from "./constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faExchangeAlt } from "@fortawesome/free-solid-svg-icons"

function App() {
  const [timeTable, setTimeTable] = useState()
  const [from, setFrom] = useState(partillePort)
  const [destination, setDestionation] = useState(nordstan)

  const getTimeTable = useCallback(async () => {
    const data = await getData(from.id, destination.id)
    setTimeTable(data)
  }, [from, destination])

  useEffect(() => {
    getTimeTable()
  }, [getTimeTable])

  const handleSwap = () => {
    const tempFrom = from
    const tempDestination = destination
    setFrom(tempDestination)
    setDestionation(tempFrom)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          {timeTable && timeTable[0].time} ({timeTable && timeTable[0].rtTime})
        </h2>
        <p>{timeTable && timeTable[1].time}</p>
        <p>{timeTable && timeTable[2].time}</p>
        <p>{timeTable && timeTable[3].time}</p>
        <h3 onClick={handleSwap}>
          {from.name} <FontAwesomeIcon icon={faArrowRight} /> {destination.name}
        </h3>
        <FontAwesomeIcon
          className="exchangeArrows"
          onClick={handleSwap}
          icon={faExchangeAlt}
        />
      </header>
    </div>
  )
}

export default App
