import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { response } from 'express'

const token = localStorage.getItem('token')

const initialState = {
    token: token ? token : null,
    loggedIn: false,
    loading: false,
    success: false,
    error: null
}

const signup = createAsyncThunk('user/signup', async (data, { rejectWithValue }) => {

    return await axios.post('/api/user/signup', data)
        .then(response => response.data)
        .catch(error => rejectWithValue(error))

})

const signin = createAsyncThunk('user/signin', async (data, { rejectWithValue }) => {

    return await axios.post('/api/user/signin', data)
        .then(response => response.data)
        .catch(error => rejectWithValue(error))

})

const getMe = createAsyncThunk('user/me', async (token) => {

    return await axios.get('/api/user/account', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(response => response.data)
        .catch(error => error.message)
})

const updateProfile = createAsyncThunk('user/update-profile', async (data, { rejectWithValue }) => {
    const { body, userName, token } = data
    return await axios.post(`/api/user/update-profile/${userName}`, body, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(response => response.data)
        .catch(error => rejectWithValue(error))
})


const updateProfilePicture = createAsyncThunk('user/update-profile-pic', async (data, { rejectWithValue }) => {
    const { body, userName, token } = data
    return await axios.post(`/api/user/update-profile-pic/${userName}`, body, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(response => response.data)
        .catch(error => rejectWithValue(error))
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state) => {
            state.token = null
            state.loggedIn = false
            state.loading = false
            state.success = false
            state.error = null
        }
    },
    extraReducers: (builder) => {

    }
})

export default userSlice.reducer
export const { resetState } = userSlice.actions