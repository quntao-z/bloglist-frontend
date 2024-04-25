import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


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

  screen.debug()

  const urlDiv = container.querySelector('.blog-url')

  expect(urlDiv).toHaveTextContent(
    'https://reactpatterns.com/'
  )

  const likeDiv = container.querySelector('.blog-likes')

  expect(likeDiv).toHaveTextContent(
    7
  )
})