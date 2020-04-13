import React from 'react'

import useMagicColor from '../../hooks/useMagicColor'
import './MagicBox.scss'

export default () => {
  const color = useMagicColor()

  return (
    <div className='magic-box' style={{ backgroundColor: color }}>
      Magic Box
    </div>
  )
}
