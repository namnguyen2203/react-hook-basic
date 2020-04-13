import { useState, useEffect, useRef } from 'react'

function randomColor(currentColor) {
  const COLOR_LIST = ['deeppink', 'green', 'black', 'blue']
  const currentIndex = COLOR_LIST.indexOf(currentColor)
  let newIndex = currentIndex

  while (newIndex === currentIndex) {
    newIndex = Math.trunc(Math.random() * COLOR_LIST.length)
  }
  return COLOR_LIST[newIndex]
}

export default () => {
  const [color, setColor] = useState('transparent')
  const colorRef = useRef(color)

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor(colorRef.current)

      setColor(newColor)
      colorRef.current = newColor
    }, 1000)

    return () => clearInterval(colorInterval)
  }, [])

  return color
}
