import { Middleware, configureStore, isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { todoApi } from './todoApi/todoApi'

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        if (action.payload && (action.payload as { status: number })?.status === 500) {
            toast.error(`Opps maybe you don't have internet connection!`)
        } else {
            toast.warning(`Ocurrió un error!`)
        }
    }
    return next(action)
}

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware: getMiddleware => getMiddleware().concat(rtkQueryErrorLogger, todoApi.middleware)
})
