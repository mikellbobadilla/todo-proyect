import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo, TodoId, TodoResponse, TodoWithId } from '../../types/todo'

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
        }),
        createTodo: builder.mutation<TodoWithId, Todo>(
            {
                query: (todo) => ({
                    url: '/todos',
                    method: 'POST',
                    body: todo
                }),
                invalidatesTags: ['GetTodos']
            }
        ),
        setIsDoneTodo: builder.mutation<void, { id: TodoId, isDone: boolean }>({
            query: (data) => ({
                url: `/todos/${data.id}`,
                method: 'PATCH',
                body: { isDone: data.isDone }
            }),
            invalidatesTags: ['GetTodos']
        })
    })
})

export const { useGetTodosQuery, useDeleteTodoMutation, useCreateTodoMutation, useSetIsDoneTodoMutation } = todoApi
