export const getExpireTime = secondsToExpires => {
  let date = new Date()
  date.setSeconds(date.getSeconds() + secondsToExpires)
  return date
}

export const getTime = () => {
  const now = new Date()
  const date = now.toISOString().substr(0, 10)
  const time = now.toTimeString().substr(0, 5)
  return { date, time }
}
