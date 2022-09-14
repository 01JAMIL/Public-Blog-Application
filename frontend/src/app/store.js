import { configureStore } from '@reduxjs/toolkit'
import articleReducer from '../features/article/articleSlice'
import authReducer from '../features/auth/userSlice'
import commentReducer from '../features/comment/commentSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer: {
        article: articleReducer,
        auth: authReducer,
        comment: commentReducer,
        user: userReducer
    }
})

export default store