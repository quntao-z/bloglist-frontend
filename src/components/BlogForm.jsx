import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleNewAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleNewUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleNewBlog = (event) => {
    event.preventDefault();

    createNewBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={(e) => handleNewBlog(e)}>
        <div>
          title:
          <input
            data-testid="title"
            value={title}
            onChange={(e) => handleNewTitle(e)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            value={author}
            onChange={(e) => handleNewAuthor(e)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            value={url}
            onChange={(e) => handleNewUrl(e)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
};

export default BlogForm;
