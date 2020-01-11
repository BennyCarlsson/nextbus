import React, { useEffect } from "react"
import logo from "./logo.png"
import "./App.css"
import { id } from "./supersecretfile"

function App() {
  useEffect(() => {
    const getTimeTable = async () => {
      const data = await getData()
      console.log(data)
    }
    getTimeTable()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>BussJävel!</p>
      </header>
    </div>
  )
}

const getData = async () => {
  let data = {}
  try {
    data = fetchData()
  } catch (error) {
    console.log("Something went wrong fetching data", error)
  }
  return data
}

const fetchData = async () => {
  const acessToken = await fetchAccessToken()
  const { date, time } = getTime()
  const tripUrl = `https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=9022014013213001&date=${date}&time=${time}&format=json`
  const response = await fetch(tripUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${acessToken}`
    }
  })
  const data = await response.json()
  return data.DepartureBoard
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
  return data.access_token
}

const getTime = () => {
  //Todo gets the buses from exactly now. Will it show late busses pass the time?
  const now = new Date()
  const date = now.toISOString().substr(0, 10)
  const time = now.toTimeString().substr(0, 5)
  return { date, time }
}

export default App
