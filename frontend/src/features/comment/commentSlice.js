import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    comment: null,
    success: false,
    error: null
}

export const getComment = createAsyncThunk('comment/get', async (data) => {
    const { token, id } = data
    return await axios.get(`/api/comment/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.data)
        .catch(error => error.message)

})

export const saveComment = createAsyncThunk('comment/save', async (data, { rejectWithValue }) => {
    const { comment, token } = data
    return await axios.post('/api/comment', comment, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.data)
        .catch(err => rejectWithValue(err.response.data))
})

export const updateComment = createAsyncThunk('comment/update', async (data) => {
    const { comment, token, id } = data
    return await axios.put(`/api/comment/${id}`, comment, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.data)
        .catch(err => rejectWithValue(err.response.data))
})

export const deleteComment = createAsyncThunk('comment/delete', async (data) => {
    const { token, id } = data
    return await axios.delete(`/api/comment/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.data)
        .catch(error => error.message)
})

export const likeComment = createAsyncThunk('comment/like', async (data) => {

})

export const unlikeComment = createAsyncThunk('comment/unlike', async (data) => {

})

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false
            state.comment = null
            state.success = false
            state.error = null
        }
    },
    extraReducers: (builder) => {

    }
})

export default commentSlice.reducer
export const { resetState } = commentSlice.actions