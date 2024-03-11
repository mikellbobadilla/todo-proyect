import { configureStore } from '@reduxjs/toolkit'
import { todoApi } from './todoApi/todoApi'

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware: getMiddleware => getMiddleware().concat(todoApi.middleware)
})
