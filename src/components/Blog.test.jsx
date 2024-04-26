import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'vitest'


test('renders blog', () => {
  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  }

  const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.button-container')
  expect(div).toHaveTextContent(
    'React patterns'
  )

  expect(div).toHaveTextContent(
    'Michael Chan'
  )
})

test('view button click', async() => {
  const mockUsername = 'ghopper'

  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
    user: {
      username: 'ghopper'
    }
  }

  const { container } = render(<Blog blog={blog} username={mockUsername}/>)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const urlDiv = container.querySelector('.blog-url')

  expect(urlDiv).toHaveTextContent(
    'https://reactpatterns.com/'
  )

  const likeDiv = container.querySelector('.blog-likes')

  expect(likeDiv).toHaveTextContent(
    7
  )
})

test('blog like button', async () => {
  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
    user: {
      username: 'ghopper'
    }
  }

  const mock = new MockAdapter(axios)
  mock.onPut(`/api/blogs/${blog._id}`).reply(200, { ...blog, likes: blog.likes + 1 })

  render(<Blog blog={blog} />)
  const user = userEvent.setup()

  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)

  expect(mock.history.put.length).toBe(1)
})