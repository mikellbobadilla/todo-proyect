import { NavLink } from 'react-router-dom'
import './Header.css'

export function Header() {
    return (
        <header className='flex justify-between items-center w-full px-3 py-2 border-b-2 border-teal-500'>
            <div className='flex justify-between items-center w-ful max-w-7xl mx-auto w-full py-2'>
                <h1 className='text-2xl md:text-3xl text-center text-sky-200 font-bold'>
                    Todo App
                </h1>
                <nav className='mr-3'>
                    <ul className='flex justify-between items-center gap-x-5'>
                        <li><NavLink to="/todos">Todos</NavLink></li>
                        <li><NavLink to='/add-todo'>Add todo</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}