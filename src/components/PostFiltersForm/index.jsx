import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

export default function PostFiltersForm({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('')
  const typingTimeoutRef = useRef(null)

  function handleSearchTermChange(e) {
    e.preventDefault()
    e.persist()
    setSearchTerm(e.target.value)

    if (!onSubmit) return

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: e.target.value,
      }
      onSubmit(formValues)
    }, 300)
  }

  return (
    <form>
      <input type='text' value={searchTerm} onChange={handleSearchTermChange} />
    </form>
  )
}

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
}

PostFiltersForm.defaultProps = {
  onSubmit: null,
}
