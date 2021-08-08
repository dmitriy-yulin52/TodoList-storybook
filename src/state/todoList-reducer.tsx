import {v1} from "uuid";
import {TitleType} from "../AppWithRedux";




export enum TODOLIST_ACTION_TYPE {
    REMOVE_TODOLIST = 'todoList-reducer/REMOVE-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'todoList-reducer/CHANGE-TODOLIST-TITLE',
    CHANGE_TODOLIST_FILTER = 'todoList-reducer/CHANGE-TODOLIST-FILTER',
    ADD_TODOLIST = 'todoList-reducer/ADD-TODOLIST',
}

export type RemoveTodoListAT = {
    type: TODOLIST_ACTION_TYPE.REMOVE_TODOLIST
    todoListId: string
}
export type AddTodoListAT = {
    type: TODOLIST_ACTION_TYPE.ADD_TODOLIST
    title: string
    todoListId: string
}
export type ChangeTodoListTitleAT = {
    type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_TITLE
    title: string
    todoListId: string
}
export type ChangeTodoListFilterAT = {
    type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_FILTER
    title: TitleType
    todoListId: string
}

export type ToDoListType = {
    id: string
    title: string
    filter: TitleType
}

export type ACType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT

const initialState: Array<ToDoListType> = []



export const todoListReducer = (todoLists: Array<ToDoListType> = initialState, action: ACType) => {

    switch (action.type) {
        case TODOLIST_ACTION_TYPE.REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case TODOLIST_ACTION_TYPE.ADD_TODOLIST:
            const newTodolist: ToDoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'All'
            }
            return [...todoLists, newTodolist]
        case TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_TITLE:
            return todoLists.map((el) => {
                if (el.id === action.todoListId) {
                    return {...el, title: action.title}
                }
                return el
            })
        case TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.title} : tl)
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {
        type: TODOLIST_ACTION_TYPE.REMOVE_TODOLIST,
        todoListId: todoListId
    }
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: TODOLIST_ACTION_TYPE.ADD_TODOLIST,
        title: title, todoListId: v1()
    }
}
export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => {
    return {
        type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_TITLE,
        title: title,
        todoListId: todoListId
    }
}
export const changeTodoListFilterAC = (title: TitleType, todoListId: string): ChangeTodoListFilterAT => {
    return {
        type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_FILTER,
        title: title,
        todoListId: todoListId
    }
}