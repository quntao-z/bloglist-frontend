import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, loadBlog, username }) => {
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

  const handleLikeButton = async () => {
    const newBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }

    const response = await blogService.update(blog.id, newBlogObject)
    setLikes(response.likes)
    loadBlog()
  }

  const handleRemoveButton = async () => {
    await blogService.remove(blog.id)
    window.confirm(`Removing the blog ${blog.title} by ${blog.author}` )
    loadBlog()
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
            Likes: {likes}
            <button onClick={handleLikeButton}>like</button>
          </div>
          <div>{blog.author}</div>
          {username === blog.user.username ? <button onClick={handleRemoveButton}>remove</button> : null}
        </div>
        : null
      }
    </div>
  )}

export default Blog