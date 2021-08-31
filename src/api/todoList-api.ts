import axios from "axios";

const instance = axios.create({
    baseURL:`https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '01ebcbdb-182e-4a23-b6f8-105b08a3a54e'
    }
})


export const TodoListApi = {
    getTodoLists() {
        return instance.get<ResponseTodoListType[]>('todo-lists')
    },
    createTodoLists() {
        return instance.post<ResponseType<{ item: ResponseTodoListType }>>('todo-lists', {title: "newTodolist"})
    },
    deleteTodoLists() {
        const todolistId = '54896ba7-93cf-40e1-b79f-0b8e2a58222d';
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)

    },
    updateTodoListsTitle() {
        const todolistId = '1dc8d7be-2e3e-4143-a11f-c237d5b3fdf8'
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: 'newUpdate-todo-title'})
    },
    getTasks(todolistId:string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    }
}

export type ResponseTodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}