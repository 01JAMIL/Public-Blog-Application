import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem('token')

const initialState = {
    token: token ? token : null,
    user: null,
    loading: false,
    success: false,
    error: null
}

export const signup = createAsyncThunk('user/signup', async (data, { rejectWithValue }) => {

    return await axios.post('/api/user/signup', data)
        .then(response => response.data)
        .catch(error => rejectWithValue(error.response.data))

})

export const signin = createAsyncThunk('user/signin', async (data, { rejectWithValue }) => {

    return await axios.post('/api/user/signin', data)
        .then(response => response.data)
        .catch(error => rejectWithValue(error.response.data))

})

export const getMe = createAsyncThunk('user/me', async (token) => {

    return await axios.get('/api/user/account', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(response => response.data)
        .catch(error => error.message)
})

export const updateProfile = createAsyncThunk('user/update-profile', async (data, { rejectWithValue }) => {
    const { body, userName, token } = data
    return await axios.post(`/api/user/update-profile/${userName}`, body, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(response => response.data)
        .catch(error => rejectWithValue(error))
})


export const updateProfilePicture = createAsyncThunk('user/update-profile-pic', async (data, { rejectWithValue }) => {
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
            state.loading = false
            state.success = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // SIGN UP
        builder.addCase(signup.pending, state => {
            state.loading = true
        })

        builder.addCase(signup.fulfilled, (state, action) => {
            state.token = action.payload
            state.loading = false
            state.success = true
        })

        builder.addCase(signup.rejected, (state, action) => {
            state.token = null
            state.loading = false
            state.success = false
            state.error = action.payload
        })

        // SIGN IN
        builder.addCase(signin.pending, state => {
            state.loading = true
        })

        builder.addCase(signin.fulfilled, (state, action) => {
            state.token = action.payload.token
            localStorage.setItem('token', state.token)
            state.loading = false
            state.success = true
        })

        builder.addCase(signin.rejected, (state, action) => {
            state.token = null
            state.loading = false
            state.success = false
            state.error = action.payload
        })

        // GET ME
        builder.addCase(getMe.pending, state => {
            state.loading = true
        })

        builder.addCase(getMe.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
            state.success = true
        })

        builder.addCase(getMe.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        })

        // UPDATE PROFILE
        builder.addCase(updateProfile.pending, state => {
            state.loading = true
        })

        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
            state.success = true
        })

        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        })

        // UPDATE PROFILE PIC
        builder.addCase(updateProfilePicture.pending, state => {
            state.loading = true
        })

        builder.addCase(updateProfilePicture.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
            state.success = true
        })

        builder.addCase(updateProfilePicture.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        })
    }
})

export default userSlice.reducer
export const { resetState } = userSlice.actions