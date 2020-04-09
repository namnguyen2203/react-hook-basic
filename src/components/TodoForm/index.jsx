import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState('')

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!onSubmit) return

    const formValues = {
      title: title.trim(),
    }

    onSubmit(formValues)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={title} onChange={handleTitleChange} />
    </form>
  )
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
}

TodoForm.defaultProps = {
  onSubmit: null,
}
