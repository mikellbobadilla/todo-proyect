import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TodoId, TodoResponse } from '../../types/todo'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/server/api' }),
    tagTypes: ['GetTodos'],
    endpoints: builder => ({
        getTodos: builder.query<TodoResponse, void>({
            query: () => '/todos',
            providesTags: ['GetTodos']
        }),
        deleteTodo: builder.mutation<void, TodoId>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['GetTodos']
        })
    })
})

export const { useGetTodosQuery, useDeleteTodoMutation } = todoApi