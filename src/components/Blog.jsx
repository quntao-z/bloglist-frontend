import { useState } from 'react'

const Blog = ({ blog, username, handleLikeButton, handleRemoveButton }) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [view, setView] = useState(false)

  const handleView = () => {
    setView(!view)
  }

  const viewButtonLabel = () => {
    return view ? 'Hide' : 'View'
  }

  return (
    <div style={blogStyle}>
      <div className='button-container'>
        <div>{blog.title} {blog.author}</div>
        <button onClick={handleView}>{viewButtonLabel()}</button>
      </div>

      { view ?
        <div>
          <div className='blog-url'>{blog.url}</div>
          <div className='blog-likes'>
            Likes: {blog.likes}
            <button onClick={() => handleLikeButton(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {username === blog.user.username ? <button onClick={() => handleRemoveButton(blog)}>remove</button> : null}
        </div>
        : null
      }
    </div>
  )}

export default Blog