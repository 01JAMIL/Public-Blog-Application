import { configureStore } from '@reduxjs/toolkit'
import articleReducer from '../features/article/articleSlice'

const store = configureStore({
    reducer: {
        article: articleReducer
    }
})

export default store