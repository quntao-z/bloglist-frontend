import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const mockLoadBlogs = function() {}
  const mockUsername = 'ghopper'

  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  }

  render(<Blog key={blog.id} loadBlog={mockLoadBlogs} blog={blog} username={mockUsername} />)
  const element = screen.getByText('React patterns /n Michael Chan')
  expect(element).toBeDefined()
})