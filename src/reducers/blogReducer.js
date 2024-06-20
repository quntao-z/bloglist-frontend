import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = []

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        createBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            const newBlog = action.payload

            return state.map(blog => 
                blog.id === newBlog.id ? newBlog : blog
            )
        }
    }
})

export const initializeBlog = () => {
    return async dispatch => {
        const allBlogs = await blogService.getAll()
        dispatch(setBlogs(allBlogs))
    }
}

export const createNewBlog = (newBlog) => {
    return async dispatch => {
        const newBlogObject = await blogService.create(newBlog)
        dispatch(createBlog(newBlogObject))
    }
}

export const increaseBlogLike = (blog) => {
    return async dispatch => {
        let newBlogObject = {
            ...blog,
            likes: blog.likes + 1,
        }

        newBlogObject = await blogService.update(newBlogObject.id, newBlogObject)
        dispatch(updateBlog(newBlogObject))
    }
}

export const { setBlogs, createBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer