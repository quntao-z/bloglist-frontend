import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// Axios request interceptor to add token to all requests
axios.interceptors.request.use(config => {
  config.headers.authorization = token
  return config
}, error => {
  return Promise.reject(error)
})

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObject) => {
  const response = await axios.post(baseUrl, blogObject)
  return response.data
}

const update = async (blogId, blogObject) => {
  const response = await axios.put(baseUrl + `/${blogId}`, blogObject)
  return response.data
}

const remove = async (blogId) => {
  const response = await axios.delete(baseUrl + `/${blogId}`)
  return response.data
}

export default { setToken, getAll, create, update, remove }
