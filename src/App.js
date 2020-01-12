import React, { useEffect, useState } from "react"
import logo from "./logo.png"
import "./App.css"
import { getData } from "./utils"

function App() {
  const [timeTable, setTimeTable] = useState()
  useEffect(() => {
    const getTimeTable = async () => {
      const data = await getData()
      setTimeTable(data)
    }
    getTimeTable()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1
          onClick={async () => {
            await getData()
          }}
        >
          Nästa BussJävel!
        </h1>
        <h2>
          {timeTable && timeTable[0].time} ({timeTable && timeTable[0].rtTime})
        </h2>
        <p>{timeTable && timeTable[1].time}</p>
        <p>{timeTable && timeTable[2].time}</p>
        <p>{timeTable && timeTable[3].time}</p>
        <h3>Partille Port -> Göteborg Nordstan</h3>
      </header>
    </div>
  )
}

export default App
