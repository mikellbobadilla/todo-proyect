import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo, TodoId, TodoResponse, TodoWithId } from '../../types/todo'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/server/api' }),
    tagTypes: ['GetTodos'],
    endpoints: builder => ({
        getTodos: builder.query<TodoResponse, number | void>({
            query: (page = 1) => `/todos?page=${page}`,
            providesTags: (result) => result
                ? [
                    ...result.content.map(({ id }) => ({ type: 'GetTodos' as const, id })),
                    { type: 'GetTodos', id: 'LIST' }
                ]
                : [{ type: 'GetTodos', id: 'LIST' }]

        }),
        deleteTodo: builder.mutation<void, TodoId>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, __, id) => ([{ type: 'GetTodos', id }])
        }),
        createTodo: builder.mutation<TodoWithId, Todo>(
            {
                query: (todo) => ({
                    url: '/todos',
                    method: 'POST',
                    body: todo
                }),
                invalidatesTags: [{ type: 'GetTodos', id: 'LIST' }]
            }
        ),
        setIsDoneTodo: builder.mutation<void, { id: TodoId, isDone: boolean }>({
            query: (data) => ({
                url: `/todos/${data.id}`,
                method: 'PATCH',
                body: { isDone: data.isDone }
            }),
            invalidatesTags: (_, __, { id }) => ([{ type: 'GetTodos', id }]),

        }),
    }),
})

export const { useGetTodosQuery, useDeleteTodoMutation, useCreateTodoMutation, useSetIsDoneTodoMutation } = todoApi
