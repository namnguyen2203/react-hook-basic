import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import queryString from 'query-string'

import ColorBox from './components/ColorBox'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import PostList from './components/PostList'
import Pagination from './components/Pagination'
import PostFiltersForm from './components/PostFiltersForm'
import Clock from './components/Clock'
import './App.scss'
import MagicBox from './components/MagicBox'

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
    title_like: '',
  })
  const [showClock, setShowClock] = useState(true)

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

  function handleFiltersChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
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
      <MagicBox />
      <h2>Todo List</h2>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <h2>Post List</h2>
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
      <button onClick={() => setShowClock(!showClock)}>Toggle Clock</button>
      {showClock && <Clock />}
    </div>
  )
}

export default App
