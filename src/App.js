import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import queryString from 'query-string'

import ColorBox from './components/ColorBox'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import PostList from './components/PostList'
import Pagination from './components/Pagination'
import './App.scss'

function App() {
  const [todoList, setTodoList] = useState([])
  const [postList, setPostList] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  })
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
  })

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters)
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`
        const response = await fetch(requestUrl)
        const responseJSON = await response.json()
        const { data, pagination } = responseJSON
        setPostList(data)
        setPagination(pagination)
      } catch (err) {
        console.log(err.message)
      }
    }

    fetchPostList()
  }, [filters])

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

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
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  )
}

export default App
