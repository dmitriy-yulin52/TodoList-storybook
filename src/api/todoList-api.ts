import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'ca7e40f6-a3b2-44a4-9411-ad0ff56cf252'
    }
})
export type TodoListTypeRes = {
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

export const TodoListApi = {
    getTodoLists() {
        return instance.get<TodoListTypeRes[]>('todo-lists')
    },
    createTodoList(title:string) {
        return instance.post<ResponseType<{ item: TodoListTypeRes }>>('todo-lists', {title: title})
    },
    deleteTodoList(id:string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)

    },
    updateTodoLists(title:string,id:string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
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

