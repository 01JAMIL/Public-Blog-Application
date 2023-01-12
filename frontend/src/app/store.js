import { configureStore } from '@reduxjs/toolkit'
import articleReducer from '../features/article/articleSlice'
import authReducer from '../features/auth/userSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer: {
        article: articleReducer,
        auth: authReducer,
        user: userReducer
    }
})

export default store