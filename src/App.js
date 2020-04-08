import React, { useState } from 'react'
import ColorBox from './components/ColorBox'
import TodoList from './components/TodoList'
import './App.scss'

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Rửa chén' },
    { id: 2, title: 'Lau nhà' },
    { id: 3, title: 'Nấu cơm' },
  ])

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id)
    if (index < 0) return 0

    const newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }

  return (
    <div className='app'>
      <ColorBox />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  )
}

export default App
