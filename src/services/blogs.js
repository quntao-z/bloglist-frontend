import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (user) => {
  const response = await axios.get(baseUrl, {
    headers: {
      'authorization' : `Bearer ${user.token}`
    }
  })
  return response.data
}

export default { getAll }