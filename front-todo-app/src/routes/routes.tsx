import { createBrowserRouter, redirect } from 'react-router-dom'
import { FormTodo } from '../components/FormTodo'
import { ListOfTodos } from '../components/ListOfTodos'
import { RootPage } from '../pages/RootPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage />,
        loader: ({ request }) => {
            if (new URL(request.url).pathname === '/') {
                return redirect('/todos')
            }
            return null
        },
        children: [
            {
                index: true,
                path: 'todos',
                element: <ListOfTodos />

            },
            {
                path: 'add-todo',
                element: <FormTodo />
            }
        ]
    }
])