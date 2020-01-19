import React, { useEffect, useState, useCallback, Fragment } from "react"
import "./App.css"
import {
  getData,
  getFromStopFromLocalStorage,
  getDestinationStopFromLocalStorage,
  saveFromStopToLocalStorage,
  saveDestinationStopToLocalStorage
} from "./utils"
import { partillePort, nordstan } from "./constants"
import TheTime from "./components/TheTime"
import NextTimes from "./components/NextTimes"
import FromTo from "./components/FromTo"

function App() {
  const [timeTable, setTimeTable] = useState()
  const [fromStop, setFromStop] = useState(
    getFromStopFromLocalStorage() ? getFromStopFromLocalStorage() : partillePort
  )
  const [destinationStop, setDestionationStop] = useState(
    getDestinationStopFromLocalStorage()
      ? getDestinationStopFromLocalStorage
      : nordstan
  )

  const getTimeTable = useCallback(async () => {
    const data = await getData(fromStop.id, destinationStop.id)
    setTimeTable(data)
  }, [fromStop, destinationStop])

  useEffect(() => {
    getTimeTable()
  }, [getTimeTable])

  const handleSwap = () => {
    const newDestinationStop = fromStop
    const newFromStop = destinationStop
    setFromStop(newFromStop)
    setDestionationStop(newDestinationStop)
    saveFromStopToLocalStorage(newFromStop)
    saveDestinationStopToLocalStorage(newDestinationStop)
  }

  return (
    <Fragment>
      {timeTable ? (
        <div className="App">
          <div className="TimeTable">
            <TheTime timeTable={timeTable} />
            <NextTimes timeTable={timeTable} />
          </div>
          <FromTo
            handleSwap={handleSwap}
            from={fromStop}
            destination={destinationStop}
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  )
}

export default App
