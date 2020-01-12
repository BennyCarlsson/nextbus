import React, { useEffect, useState } from "react"
import logo from "./logo.png"
import "./App.css"

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
        <h1>Nästa BussJävel!</h1>
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

var token = { accessToken: "", expires: null }
const id =
  "T0hDc2txdEp6cDhMYlVmRjhsaWVfeERHdDBBYTp6ME5wWWY3dlYxbUFhTEVFbkdyRFprTGEwODBh"

const getData = async () => {
  let data
  if (!isTokenValid()) {
    await setToken()
  }
  let response = await fetchData()
  if (response.status === 401) {
    await setToken()
    response = await fetchData()
  }
  if (response.status === 200) {
    data = await response.json()
    return data.DepartureBoard.Departure.filter(buss => buss.track === "A")
  }
  return data
}

const fetchData = async () => {
  const { date, time } = getTime()
  const tripUrl = `https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=9022014013213001&date=${date}&time=${time}&format=json`
  const response = await fetch(tripUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.accessToken}`
    }
  })
  return response
}

const isTokenValid = () => {
  if (!token.accessToken) return false
  if (token.expires && token.expires > new Date()) return false
  return true
}

const setToken = async () => {
  const data = await fetchAccessToken()
  const expires = getExpireTime(data.expires_in)
  const accessToken = data.access_token
  token = { accessToken, expires }
}

const getExpireTime = secondsToExpires => {
  let date = new Date()
  date.setSeconds(date.getSeconds() + secondsToExpires)
  return date
}

const fetchAccessToken = async () => {
  const response = await fetch("https://api.vasttrafik.se:443/token", {
    headers: {
      Authorization: `Basic ${id}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    body: "grant_type=client_credentials"
  })
  const data = await response.json()
  return data
}

const getTime = () => {
  //Todo gets the buses from exactly now. Will it show late busses pass the time?
  const now = new Date()
  const date = now.toISOString().substr(0, 10)
  const time = now.toTimeString().substr(0, 5)
  return { date, time }
}

export default App
