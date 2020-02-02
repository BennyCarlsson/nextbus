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
  const [error, setError] = useState({ isError: false })
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
    handleData(data)
  }, [fromStop, destinationStop])

  useEffect(() => {
    getTimeTable()
  }, [getTimeTable])

  const handleData = data => {
    if (data) {
      if (data.DepartureBoard && data.DepartureBoard.error) {
        setError({
          isError: true,
          title: data.DepartureBoard.error,
          text: data.DepartureBoard.errorText
        })
        return
      }
      if (data.DepartureBoard.Departure) {
        setTimeTable(data.DepartureBoard.Departure)
        setError({ isError: false })
        return
      }
    }
    setError({ isError: true, title: "Oops!", text: "Something went wrong 🤔" })
  }

  const handleSwap = () => {
    const newDestinationStop = fromStop
    const newFromStop = destinationStop
    setFromStop(newFromStop)
    setDestionationStop(newDestinationStop)
    saveFromStopToLocalStorage(newFromStop)
    saveDestinationStopToLocalStorage(newDestinationStop)
  }

  const isLoading = () => {
    return !error.isError && !timeTable
  }

  return (
    <div className="App">
      {error.isError && (
        <Fragment>
          <h2>{error.title}</h2>
          <p>{error.text}</p>
        </Fragment>
      )}
      {timeTable && (
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
      )}
      {isLoading() && <p>fetching data..</p>}
    </div>
  )
}

export default App
