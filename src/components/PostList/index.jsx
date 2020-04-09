import PropTypes from 'prop-types'
import React from 'react'

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.array,
}

PostList.defaultProps = {
  posts: [],
}
