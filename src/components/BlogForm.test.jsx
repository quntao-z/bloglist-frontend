import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("BlogForm updating parent state and calls onSubmit", async () => {
  const createNewBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createNewBlog={createNewBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("Create");

  await user.type(inputs[0], "testing title");
  await user.type(inputs[1], "testing author");
  await user.type(inputs[2], "testing url");

  await user.click(sendButton);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0]).toStrictEqual({
    title: "testing title",
    author: "testing author",
    url: "testing url",
  });
});
