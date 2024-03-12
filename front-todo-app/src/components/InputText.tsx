export function InputText(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className='border rounded-lg p-2 border-gray-700 bg-transparent w-full mb-5'
        />
    )
}