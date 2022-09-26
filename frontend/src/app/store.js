import { configureStore } from '@reduxjs/toolkit'
import articleReducer from '../features/article/articleSlice'
import authReducer from '../features/auth/userSlice'
import categoryReducer from '../features/category/categorySlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer: {
        article: articleReducer,
        auth: authReducer,
        category: categoryReducer,
        user: userReducer
    }
})

export default store