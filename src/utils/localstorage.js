export const saveFromStopToLocalStorage = fromStop => {
  localStorage.setItem("fromStop", JSON.stringify(fromStop))
}

export const saveDestinationStopToLocalStorage = destinationStop => {
  localStorage.setItem("destinationStop", JSON.stringify(destinationStop))
}

export const getFromStopFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("fromStop"))
}

export const getDestinationStopFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("destinationStop"))
}
