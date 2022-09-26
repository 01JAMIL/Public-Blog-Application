import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    categorys: [],
    success: false,
    error: null
}

export const getCategorys = createAsyncThunk('categorys/get', async (token) => {
    return axios.get(`/api/category/all`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.data)
        .catch((error) => error.message)

})
const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false
            state.categorys = []
            state.success = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        /* GET COMMENT */
        builder.addCase(getCategorys.pending, state => {
            state.loading = true
        })

        builder.addCase(getCategorys.fulfilled, (state, action) => {
            state.loading = false
            state.categorys = action.payload
            state.success = true
        })

        builder.addCase(getCategorys.rejected, (state, action) => {
            state.loading = false
            state.categorys = null
            state.success = false
            state.error = action.payload
        })
    }
})

export default commentSlice.reducer
export const { resetState } = commentSlice.actions