import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '05503387-0c4b-4e45-bfc4-837ec49e7a98'
    }
})
export type TodoListTypeRes = {
    id: string
    title: string
    addedDate: string
    order: number
    isFetching?:false

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

export const TodoListApi = {
    getTodoLists() {
        return instance.get<TodoListTypeRes[]>('todo-lists')
    },
    createTodoList(title:string) {
        return instance.post<ResponseType<{ item: TodoListTypeRes }>>('todo-lists', {title: title})
    },
    deleteTodoList(id:string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise
    },
    updateTodoLists(id:string,title:string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId:string, taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string, taskId:string, model:UpdateTaskModelType){
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`,model)
    }
}

