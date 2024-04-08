import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    // try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    // } catch (exception) {
    //   setErrorMessage('Wrong credentials')
    //   setTimeout(() => {
    //     setErrorMessage(null)
    //   }, 5000)
    // }
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
    blogService.getAll(user).then(blogs =>
      setBlogs( blogs )
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null && loginForm()}
      {user !== null && loadBlogs()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App