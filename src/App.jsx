import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState("");
  const [error, setError] = useState(false);

  const blogFormRef = useRef();


  useEffect(() => {
    if (user) {
      loadBlogs()
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      renderNotificationMessage(true, 'Wrong credentials')
    }
  }

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      renderNotificationMessage(false, `A new blog was added: ${response.title} by ${response.author}`)
    } catch (exception) {
      console.log(exception)
      renderNotificationMessage(true, "Blog was unable to be added")
    }
  }

  const renderNotificationMessage = (isError, errorMessage) => {
    setError(isError)
    setNotificationMessage(errorMessage)
    setTimeout(() => {
      setNotificationMessage('')
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type='text'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const loadBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ).catch(error => {
      console.error('Failed to load blogs: ', error)
    })
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogAppUser")
  }

  if (user === null) {
    return (
      <div>
        <h2>Log into application</h2>
        <Notification message={notificationMessage} error={error} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} error={error} />
      <div className='button-container'>
        <p>{user.name} logged in</p>
        <button onClick={logOut}>Log Out</button>
      </div>
      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable> 
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App