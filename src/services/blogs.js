import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      authorization: token,
    },
  });
  return response.data;
};

const create = async (blogObject) => {
  const response = await axios.post(baseUrl, blogObject,
  {
    headers: {
      authorization: token,
    },
  })
  return response
}

export default { setToken, getAll, create };
