export interface Todo {
    title: string
    description: string
    targetDate: string
    isDone: boolean
}

export type TodoId = string

export interface TodoWithId extends Todo {
    id: TodoId
}

export interface TodoResponse {
    content: TodoWithId[]
    pageNumber: number
    pageSize: number
    totalElements: number
}