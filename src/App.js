import React, { useEffect, useState, useCallback, Fragment } from "react"
import "./App.css"
import { getData } from "./utils"
import { partillePort, nordstan } from "./constants"
import TheTime from "./components/TheTime"
import NextTimes from "./components/NextTimes"
import FromTo from "./components/FromTo"

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
    <Fragment>
      {timeTable ? (
        <div className="App">
          <div className="TimeTable">
            <TheTime timeTable={timeTable} />
            <NextTimes timeTable={timeTable} />
          </div>
          <FromTo
            handleSwap={handleSwap}
            from={from}
            destination={destination}
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  )
}

export default App
