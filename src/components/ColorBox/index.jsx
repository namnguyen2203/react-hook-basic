import React, { useState } from 'react'

import './ColorBox.scss'

function getRandomColor() {
  const COLOR_LIST = ['deeppink', 'green', 'black', 'blue']
  const randomIndex = Math.trunc(Math.random() * COLOR_LIST.length)
  return COLOR_LIST[randomIndex]
}

export default function ColorBox() {
  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem('box_color') || 'deeppink'
    return initColor
  })

  function handleBoxClick() {
    const newColor = getRandomColor()
    setColor(newColor)
    localStorage.setItem('box_color', newColor)
  }

  return (
    <div className='color-box' style={{ backgroundColor: color }} onClick={() => handleBoxClick()}>
      Color Box
    </div>
  )
}
