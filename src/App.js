import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ColorBox from './components/ColorBox'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import PostList from './components/PostList'
import './App.scss'

function App() {
  const [todoList, setTodoList] = useState([])
  const [postList, setPostList] = useState([])

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1'
        const response = await fetch(requestUrl)
        const responseJSON = await response.json()
        const { data } = responseJSON
        setPostList(data)
      } catch (err) {
        console.log(err.message)
      }
    }

    fetchPostList()
  }, [])

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
      <PostList posts={postList} />
    </div>
  )
}

export default App
