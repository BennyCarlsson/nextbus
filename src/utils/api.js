import { getTime, getExpireTime } from "./utils"

var token = { accessToken: "", expires: null }
const id =
  "T0hDc2txdEp6cDhMYlVmRjhsaWVfeERHdDBBYTp6ME5wWWY3dlYxbUFhTEVFbkdyRFprTGEwODBh"

export const getData = async (fromStopId) => {
  let data
  if (!isTokenValid()) {
    await setToken()
  }
  let response = await fetchData(fromStopId)
  if (response.status === 401) {
    await setToken()
    response = await fetchData(fromStopId)
  }
  if (response.status === 200) {
    data = await response.json()
    return data
  }
  return data
}

const fetchData = async (fromStopId) => {
  const { date, time } = getTime()
  const tripUrl = `https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=${fromStopId}&date=${date}&time=${time}&format=json`
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
  if (token.expires && token.expires < new Date()) return false
  return true
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

const setToken = async () => {
  const data = await fetchAccessToken()
  const expires = getExpireTime(data.expires_in)
  const accessToken = data.access_token
  token = { accessToken, expires }
}
