import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import blogService from './services/blogs'
import loginService from './services/login'
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState("");
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
      setError(true)
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage('')
        setError(false)
      }, 5000)
    }
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

  const handleNewTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(blogObject)
    blogs.concat(response.data)
    console.log(response)
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
      <p>{user.name} logged in</p>
      <button onClick={logOut}>Log Out</button>
      <h2>Create new Blog</h2>
      <NoteForm title={title} handleNewTitle={handleNewTitle} author={author} handleNewAuthor={handleNewAuthor}
      url={url} handleNewUrl={handleNewUrl} handleNewBlog={handleNewBlog}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App