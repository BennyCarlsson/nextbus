import React, { useEffect } from "react"
import logo from "./logo.png"
import "./App.css"
import { id } from "./supersecretfile"

function App() {
  useEffect(() => {
    fetch("https://api.vasttrafik.se:443/token", {
      headers: {
        Authorization: `Basic ${id}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: "grant_type=client_credentials"
    }).then(res =>
      res
        .json()
        .catch(error => console.error("Error:", error))
        .then(response => {
          const token = response.access_token
          const now = new Date()
          const date = now.toISOString().substr(0, 10)
          const time = now.toLocaleTimeString().substr(0, 5)
          const tripUrl = `https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=9022014013213001&date=2020-01-10&time=21:03&format=json`
          fetch(tripUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(res => res.json().then(response => console.log(response)))
        })
    )
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

export default App
