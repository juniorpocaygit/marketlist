import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import listReducer from './slices/listSlice'
import productReducer from './slices/productSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        list: listReducer,
        product: productReducer,
    }
})