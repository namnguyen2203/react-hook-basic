import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import queryString from 'query-string'
import axios from 'axios'

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
    async function getTodos() {
      try {
        const res = await axios.get('http://localhost:5000/todos')
        setTodoList(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    getTodos()
  }, [])

  useEffect(() => {
    async function fetchPostList() {
      try {
        const params = queryString.stringify(filters)
        const url = `http://js-post-api.herokuapp.com/api/posts?${params}`
        const res = await fetch(url)
        const json = await res.json()
        const { data, pagination } = json
        setPostList(data)
        setPagination(pagination)
      } catch (err) {
        console.error(err.message)
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

    axios
      .delete(`http://localhost:5000/todos/${todo.id}`)
      .catch((err) => console.error(err))

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
    axios
      .post('http://localhost:5000/todos', {
        ...newTodo,
      })
      .catch((err) => console.error(err))

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
