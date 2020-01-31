import React, { useEffect, useState, useCallback, Fragment } from "react"
import "./App.css"
import { getData } from "./utils/api"
import {
  getFromStopFromLocalStorage,
  getDestinationStopFromLocalStorage,
  saveFromStopToLocalStorage,
  saveDestinationStopToLocalStorage
} from "./utils/localstorage"
import { partillePort, nordstan } from "./utils/constants"
import TheTime from "./components/TheTime"
import NextTimes from "./components/NextTimes"
import FromTo from "./components/FromTo"

function App() {
  const [timeTable, setTimeTable] = useState()
  const fromStopLocalStorage = getFromStopFromLocalStorage()
  const [fromStop, setFromStop] = useState(
    fromStopLocalStorage ? fromStopLocalStorage : partillePort
  )
  const destinationStopLocalStorage = getDestinationStopFromLocalStorage()
  const [destinationStop, setDestionationStop] = useState(
    destinationStopLocalStorage ? destinationStopLocalStorage : nordstan
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
    <div className="App">
      {timeTable ? (
        <Fragment>
          <div className="TimeTable">
            <TheTime timeTable={timeTable} />
            <NextTimes timeTable={timeTable} />
          </div>
          <FromTo
            handleSwap={handleSwap}
            from={fromStop}
            destination={destinationStop}
          />
        </Fragment>
      ) : (
        <p>fetching data..</p>
      )}
    </div>
  )
}

export default App
