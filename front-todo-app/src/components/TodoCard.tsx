import { TodoWithId } from '../types/todo'
import { TrashIcon } from './icons/TrashIcons'

export function TodoCard({ todo, deleteTodo, onChange }: React.PropsWithChildren<{ todo: TodoWithId, deleteTodo: () => void, onChange: React.ChangeEventHandler<HTMLInputElement> }>) {
    return (
        <li className='flex flex-col border rounded-lg p-2 relative border-gray-700'>
            <h4 className='text-xl font-semibold text-sky-300 mb-3'>
                {todo.title}
            </h4>
            <p className='mb-2'>{todo.description}</p>
            <p className='mb-2'>Target Date: {todo.targetDate}</p>
            <span className={`flex gap-x-2 items-center mb-2 ${todo.isDone ? 'text-green-300' : 'text-red-300'}`}>
                <input type="checkbox" id={todo.id} checked={todo.isDone} onChange={onChange} className='size-4 accent-sky-300' />
                <label htmlFor={todo.id}>
                    {todo.isDone ? 'Done' : 'Not done'}
                </label>
            </span>
            <button
                onClick={deleteTodo}
                className='absolute top-2 right-2 text-red-300 hover:text-red-500 transition-all'
            >
                <TrashIcon />
            </button>
        </li>
    )
}
