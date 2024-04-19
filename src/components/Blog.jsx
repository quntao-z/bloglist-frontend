import { useState } from "react"

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
  
  return (
    <div style={blogStyle}>
      <div className='button-container'>
        <div>{blog.title} {blog.author}</div>
        <button onClick={handleView}>{viewButtonLabel()}</button>
      </div>  

      { view ?
        <div>
          <div>{blog.url}</div>
          <div>Likes: {blog.likes}</div>
          <div>{blog.author}</div>
        </div>
        : null
      }
    </div>
)}

export default Blog