import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCreateTodoMutation } from '../store/todoApi/todoApi'
import { InputText } from './InputText'

export function FormTodo() {
    const navigate = useNavigate()
    const [createTodo] = useCreateTodoMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const title = form.get('title') as string
        const description = form.get('description') as string
        const targetDate = form.get('targetDate') as string
        const isDone = form.get('isDone') === 'on' ? true : false
        const todo = { title, description, targetDate, isDone }

        createTodo(todo)
            .then(() => {
                toast.success(`Todo created`)
                navigate('/todos')
                return
            })
            .catch((error) => {
                if (error.status === 500) {
                    toast.error("Can't create todo, check your connection")
                } else {
                    toast.error('Error creating todo')
                }
                return
            })
    }

    return (
        <section className='w-full max-w-lg mx-auto'>
            <h2 className='text-xl lg:text-2xl text-sky-500 font-semibold'>
                Create Todo
            </h2>
            <form className='mt-3' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <InputText type='text' name='title' placeholder='Title' />
                    <InputText type='text' name='description' placeholder='Description' />
                    <InputText type='date' name='targetDate' placeholder='Target Date' />
                </div>
                <div className='flex items-center'>
                    <input type="checkbox" name='isDone' id='isDone' className='size-4 accent-sky-300' />
                    <label htmlFor='isDone' className='ml-2 '>Is Done?</label>
                </div>
                <button
                    type='submit'
                    className='bg-sky-500 text-white rounded-lg p-2 mt-3 hover:bg-sky-600 transition-all'
                >
                    Create
                </button>
            </form>
        </section>
    )
}