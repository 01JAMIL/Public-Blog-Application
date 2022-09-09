import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Initial state
const initialState = {
    data: [],
    loading: false,
    error: null,
    sucess: false
}

// Functions

// Get all articles exists
export const getArticles = createAsyncThunk('article/all', async (token) => {
    return await axios.get('/api/article/articles', {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
        .catch(error => error.message)
})

// Create new article
export const createArticle = createAsyncThunk('article/create', async (data, { rejectWithValue }) => {
    const { article, token } = data

    return await axios.post('/api/article/create', article, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => response.data)
        .catch(error => rejectWithValue(error.response.data))
})

// update article
export const updateArticle = createAsyncThunk('article/update', async (data, { rejectWithValue }) => {
    const { article, token, id } = data

    return await axios.put(`/api/article/update/${id}`, article, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => response.data)
        .catch(error => rejectWithValue(error.response.data))
})

// Delete article
export const deleteArticle = createAsyncThunk('article/delete', async (data) => {
    const { token, id } = data

    return await axios.delete(`/api/article/delete/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => response.data)
        .catch(error => error.message)
})

// Like article
export const likeArticle = createAsyncThunk('article/like', async (data) => {
    const { body, token, id } = data

    return await axios.put(`/api/article/like/${id}`, body, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => response.data)
        .catch(error => error.message)
})

//Unlike article
export const unlikeArticle = createAsyncThunk('article/unlike', async (data) => {
    const { body, token, id } = data

    return await axios.put(`/api/article/unlike/${id}`, body, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => response.data)
        .catch(error => rejectWithValue(error.response.data))
})

// Get number of likes
export const numberOfLikes = createAsyncThunk('article/likes', async (data) => {
    const { token, id } = data
    return await axios.get(`/api/article/count/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => response.data)
        .catch(error => error.message)
})


// Slice
const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        resetState: (state) => {
            state.data = []
            state.loading = false
            state.error = null
            state.sucess = true
        }
    },
    extraReducers: (builder) => {
        // Get articles 
        builder.addCase(getArticles.pending, state => {
            state.loading = true
        })

        builder.addCase(getArticles.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
            state.sucess = true
        })

        builder.addCase(getArticles.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.payload
            state.sucess = false
        })

        // Create article
        builder.addCase(createArticle.pending, state => {
            state.loading = true
        })

        builder.addCase(createArticle.fulfilled, (state, action) => {
            state.loading = false
            state.data.push(action.payload)
            state.error = null
            state.sucess = true
        })

        builder.addCase(createArticle.fulfilled, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.sucess = false
        })

        // Update article
        builder.addCase(updateArticle.pending, state => {
            state.loading = true
        })

        builder.addCase(updateArticle.fulfilled, (state, action) => {
            state.loading = false

            const index = state.data.findIndex(a => a._id === action.payload._id)
            state.data[index] = action.payload

            state.error = null
            state.sucess = true
        })

        builder.addCase(updateArticle.fulfilled, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.sucess = false
        })

        // Delete article
        builder.addCase(deleteArticle.pending, state => {
            state.loading = true
        })

        builder.addCase(deleteArticle.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.sucess = true
        })

        builder.addCase(deleteArticle.fulfilled, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.sucess = false
        })
    }
})

export default articleSlice.reducer
export const { resetState } = articleSlice.actions