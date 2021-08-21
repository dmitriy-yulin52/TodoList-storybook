import axios from "axios";

const instance = axios.create({
    baseURL:`https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '61621252-ff2c-43d3-a118-9f7f7ab13dae'
    }
})

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': '0d4603e0-cc09-411a-94af-0a9525e55f79'
//     }
// }


type CommonResponseType<T = {}> = {
    fieldsErrors:Array<string>
    messages: Array<string>
    resultCode:number
    data: T
}


type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}


export const TodoListApi = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodoLists() {
        return instance.post<CommonResponseType<{ item: TodoListType }>>('todo-lists', {title: "newTodolist"})
    },
    deleteTodoLists() {
        const todolistId = '54896ba7-93cf-40e1-b79f-0b8e2a58222d';
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)

    },
    updateTodoListsTitle() {
        const todolistId = '1dc8d7be-2e3e-4143-a11f-c237d5b3fdf8'
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title: 'newUpdate-todo-title'})
    }
}