import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ColorBox from './components/ColorBox'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import './App.scss'

function App() {
  const [todoList, setTodoList] = useState([])

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id)
    if (index < 0) return 0

    const newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }

  function handleTodoFormSubmit(formValues) {
    const newTodoList = [...todoList]
    const newTodo = {
      id: uuidv4(),
      ...formValues,
    }

    newTodoList.push(newTodo)
    setTodoList(newTodoList)
  }

  return (
    <div className='app'>
      <ColorBox />
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  )
}

export default App
