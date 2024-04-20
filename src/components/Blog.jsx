import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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
    return view ? "Hide" : "View"
  }

  const likeButton = () => {
    const newBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    const response = blogService.update(blog.id, newBlogObject)
    console.log(response)
  }

  return (
    <div style={blogStyle}>
      <div className='button-container'>
        <div>{blog.title} {blog.author}</div>
        <button onClick={handleView}>{viewButtonLabel()}</button>
      </div>

      { view ?
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button onClick={likeButton}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
        : null
      }
    </div>
)}

export default Blog