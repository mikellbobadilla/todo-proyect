import { useState } from 'react'
import { toast } from 'sonner'
import { useDeleteTodoMutation, useGetTodosQuery, useSetIsDoneTodoMutation } from '../store/todoApi/todoApi'
import { TodoId, TodoWithId } from '../types/todo'
import { Badge } from './Badge'
import { Spinner } from './Spinner'
import { TodoCard } from './TodoCard'

export function ListOfTodos() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useGetTodosQuery(page)
    const [deleteTodo] = useDeleteTodoMutation()

    const handleDeleteTodo = (todo: TodoWithId) => {
        deleteTodo(todo.id).unwrap()
            .then(() => {
                toast.info(`Todo "${todo.title}" deleted`)
                return
            })
            .catch(() => {
                toast.error('Error deleting todo')
                return
            })
    }

    const handlePage = (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPage(page)
    }

    const [updateTodo] = useSetIsDoneTodoMutation()

    const handleChange = (id: TodoId, isDone: boolean) => {
        updateTodo({ id, isDone })
            .unwrap()
            .then(() => {
                toast.info(`Todo updated`)
                return
            })
            .catch(() => {
                toast.error('Error updating todo')
                return
            })
    }

    if (isError) {
        toast.error(' Check your internet connection and try again.')
        return (
            <section>
                <p className='text-2xl text-center mt-4 text-red-300'>
                    Something went wrong
                </p>
            </section>
        )
    }

    if (isLoading) return (
        <section className='flex justify-center mt-10'>
            <Spinner size='size-10' />
        </section>
    )

    return (
        <section >
            <header className='flex justify-between items-center py-2'>
                <h2 className='text-2xl text-sky-500 font-semibold'>
                    List of Todos
                </h2>
                <p>
                    Todos:
                    <Badge>{data?.totalElements}</Badge>
                </p>
            </header>
            <div>
                {
                    data?.content.length === 0 ? (
                        <p className='text-center text-xl mt-4 text-gray-600'>
                            No todos found, add a new one.
                        </p>
                    ) : (
                        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3'>
                            {
                                data?.content.map((item) => (
                                    <TodoCard
                                        key={item.id}
                                        todo={item}
                                        onChange={(event) => handleChange(item.id, event.target.checked)}
                                        deleteTodo={() => handleDeleteTodo(item)}
                                    />
                                ))
                            }
                        </ul>
                    )
                }
            </div>

            {
                (data && data?.totalPages > 1) && (
                    <footer className="flex flex-col items-center mt-7 w-full mx-auto max-w-96 mb-5">

                        <span className="text-sm text-gray-400">
                            Showing <span className="font-semibold text-white">{data.pageNumber}</span> to <span className="font-semibold text-white">{data.totalPages}</span> of <span className="font-semibold text-white">
                                {data.pageSize}
                            </span> Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">

                            <button
                                disabled={!data.hasPrevious}
                                onClick={() => handlePage(page - 1)}
                                className="flex items-center justify-center px-3 h-8 text-sm font-medium  rounded-s bg-gray-800 disabled:bg-gray-800 disabled:text-gray-400 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                </svg>
                                Prev
                            </button>
                            <button

                                disabled={!data.hasNext}
                                onClick={() => handlePage(page + 1)}
                                className="flex items-center justify-center px-3 h-8 text-sm font-medium border-0 border-s rounded-e disabled:bg-gray-800 disabled:text-gray-400 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                Next
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    </footer>
                )
            }

        </section>
    )
}