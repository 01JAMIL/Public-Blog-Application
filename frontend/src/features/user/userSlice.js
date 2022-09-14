import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    loading: false,
    user: null,
    success: false,
    error: null
}


const getUserById = createAsyncThunk('user/get-data', async (id) => {
    return axios.get(`/api/user/get-data/${id}`)
        .then((response) => response.data)
        .catch((error) => error)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false
            state.user = null
            state.success = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserById.pending, state => {
            state.loading = true
        })

        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.success = true
        })

        builder.addCase(getUserById.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.success = false
            state.error = action.error.message
        })
    }
})


export default userSlice.reducer
export const { resetState } = userSlice.actions