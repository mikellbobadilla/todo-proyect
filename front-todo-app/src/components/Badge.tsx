import React from 'react'

export function Badge({ children }: React.PropsWithChildren) {
    return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ml-3">
            {children}
        </span>
    )
}