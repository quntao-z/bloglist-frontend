const NoteForm = ({title, handleNewTitle, author, handleNewAuthor, url, handleNewUrl, handleNewBlog}) => {
    return (
            <form onSubmit={handleNewBlog}>
                <div>
                    title:
                    <input value={title} onChange={(e) => handleNewTitle(e)}/>
                </div>
                <div>
                    author:
                    <input value={author} onChange={(e) => handleNewAuthor(e)}/>
                </div>
                <div>
                    url:
                    <input value={url} onChange={(e) => handleNewUrl(e)}/> 
                </div>
                <button type="submit">Create</button>
            </form>
    ) 
}

export default NoteForm;