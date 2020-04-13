import { useState, useEffect } from 'react'

function formatDate() {
  const now = new Date()
  const hours = `0${now.getHours()}`.slice(-2)
  const minutes = `0${now.getMinutes()}`.slice(-2)
  const seconds = `0${now.getSeconds()}`.slice(-2)
  return `${hours}:${minutes}:${seconds}`
}

export default () => {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const newTimeString = formatDate()

      setTimeString(newTimeString)

      return () => clearInterval(clockInterval)
    }, 1000)
  }, [])

  return { timeString }
}
