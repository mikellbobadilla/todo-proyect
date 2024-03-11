import { useDeleteTodoMutation, useGetTodosQuery } from '../store/todoApi/todoApi'
import { Badge } from './Badge'
import { Spinner } from './Spinner'
import { TodoCard } from './TodoCard'

export function ListOfTodos() {

    const { data, isLoading, isError } = useGetTodosQuery()
    const [deleteTodo] = useDeleteTodoMutation()

    if (isError) return (
        <section>
            <p className='text-2xl text-center mt-4 text-red-300'>Something went wrong</p>
        </section>
    )

    if (isLoading)
        return (
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
                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3'>
                    {
                        data?.content.map((item) => (
                            <TodoCard todo={item} deleteTodo={() => deleteTodo(item.id)} />
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}