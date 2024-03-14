import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Header } from '../components/Header'

export function RootPage() {
    return (
        <>
            <Header />
            <main className='px-3 py-2 max-w-7xl mx-auto w-full'>
                <Outlet />
                <Toaster richColors position='top-center' visibleToasts={1} expand />
            </main>
        </>
    )
}