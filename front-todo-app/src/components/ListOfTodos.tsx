import { toast } from 'sonner'
import { useDeleteTodoMutation, useGetTodosQuery, useSetIsDoneTodoMutation } from '../store/todoApi/todoApi'
import { TodoId, TodoWithId } from '../types/todo'
import { Badge } from './Badge'
import { Spinner } from './Spinner'
import { TodoCard } from './TodoCard'

export function ListOfTodos() {

    const { data, isLoading, isError } = useGetTodosQuery()
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
                    <Badge>{data?.content.length}</Badge>
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
        </section>
    )
}