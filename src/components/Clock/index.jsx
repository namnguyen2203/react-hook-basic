import React from 'react'
import useClock from '../../hooks/useClock'

export default () => {
  const { timeString } = useClock()

  return <h1>{timeString}</h1>
}
