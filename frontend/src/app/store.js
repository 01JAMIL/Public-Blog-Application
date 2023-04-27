import { configureStore } from '@reduxjs/toolkit'
import articleReducer from '../features/article/articleSlice'
import authReducer from '../features/auth/userSlice'

const store = configureStore({
    reducer: {
        article: articleReducer,
        auth: authReducer
    }
})

export default store