import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo, TodoId, TodoResponse, TodoWithId } from '../../types/todo'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/server/api' }),
    tagTypes: ['GetTodos'],
    endpoints: builder => ({
        getTodos: builder.query<TodoResponse, number | void>({
            query: (page = 1) => `/todos?page=${page}`,
            providesTags: (result) =>
                result ? [
                    // Provides a tag for each post in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map(({ id }) => ({ type: 'GetTodos' as const, id })),
                    { type: 'GetTodos', id: 'PARTIAL-LIST' },
                ]
                    : [{ type: 'GetTodos', id: 'PARTIAL-LIST' }]

        }),
        deleteTodo: builder.mutation<void, TodoId>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_, _error, id) => [
                { type: 'GetTodos', id },
                { type: 'GetTodos', id: 'PARTIAL-LIST' },
            ]
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
