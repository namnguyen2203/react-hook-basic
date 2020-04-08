import React from 'react'
import PropTypes from 'prop-types'

export default function TodoList({ todos, onTodoClick }) {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => onTodoClick(todo)}>
          {todo.title}
        </li>
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoClick: PropTypes.func,
}

TodoList.defaultProps = {
  todos: [],
  onTodoClick: null,
}
