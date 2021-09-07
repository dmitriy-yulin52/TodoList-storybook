import {TodoListApi, TodoListTypeRes} from "../api/todoList-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, SetStatusAT} from "../app/app-reducer";


export type TitleType = "All" | "Active" | "Completed"

export enum TODOLIST_ACTION_TYPE {
    REMOVE_TODOLIST = 'todoList-reducer/REMOVE-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'todoList-reducer/CHANGE-TODOLIST-TITLE',
    CHANGE_TODOLIST_FILTER = 'todoList-reducer/CHANGE-TODOLIST-FILTER',
    ADD_TODOLIST = 'todoList-reducer/ADD-TODOLIST',
    SET_TODOlIST = 'todoList-reducer/SET-TODOlIST',
    CHANGE_TODOLIST_ENTITY_STATUS = 'todoList-reducer/CHANGE_TODOLIST_ENTITY_STATUS',
}

// export type RemoveTodoListAT = {
//     type: TODOLIST_ACTION_TYPE.REMOVE_TODOLIST
//     todoListId: string
// }
// export type AddTodoListAT = {
//     type: TODOLIST_ACTION_TYPE.ADD_TODOLIST
//     title: string
//     todoListId: string
// }
// export type ChangeTodoListTitleAT = {
//     type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_TITLE
//     title: string
//     todoListId: string
// }
// export type ChangeTodoListFilterAT = {
//     type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_FILTER
//     title: TitleType
//     todoListId: string
// }



export const todoListReducer = (todoLists: Array<TodoListDomainType> = initialState, action: ACType) => {

    switch (action.type) {
        case TODOLIST_ACTION_TYPE.REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case TODOLIST_ACTION_TYPE.ADD_TODOLIST:
            return [{...action.todolist,filter: 'All',entityStatus: 'idle'},...todoLists]
        case TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_TITLE:
            return todoLists.map((el) => {
                if (el.id === action.id) {
                    return {...el, title: action.title}
                }
                return el
            })
        case TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_ENTITY_STATUS:
            return todoLists.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case TODOLIST_ACTION_TYPE.SET_TODOlIST: {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'All',
                entityStatus: 'idle'
            }))
        }

        default:
            return todoLists
    }
}



//action
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: TODOLIST_ACTION_TYPE.REMOVE_TODOLIST,
        todoListId: todoListId
    } as const
}
export const addTodoListAC = (todolist: TodoListTypeRes) => {
    return {
        type: TODOLIST_ACTION_TYPE.ADD_TODOLIST,
        todolist
    } as const
}
export const changeTodoListTitleAC = (title: string, id: string) => {
    return {
        type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_TITLE,
        title,
        id
    }as const
}
export const changeTodoListFilterAC = (filter: TitleType, id: string)=> {
    return {
        type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_FILTER,
        filter,
        id
    }as const
}
export const changeTodoListEntityStatusAC = (status: RequestStatusType, id: string)=> {
    return {
        type: TODOLIST_ACTION_TYPE.CHANGE_TODOLIST_ENTITY_STATUS,
        status,
        id
    }as const
}
export const setTodolistsAC = (todoLists: Array<TodoListTypeRes>) => {
    return {
        type: TODOLIST_ACTION_TYPE.SET_TODOlIST,
        todoLists
    } as const
}



//thunk
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        TodoListApi.getTodoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {

    return (dispatch: Dispatch<ACType>) => {

        TodoListApi.deleteTodoList(todolistId)
            .then((res) => {
                dispatch(removeTodoListAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        TodoListApi.createTodoList(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (title: string, id: string) => {
    return (dispatch: Dispatch<ACType>) => {
        TodoListApi.updateTodoLists(title, id)
            .then((res) => {
                dispatch(changeTodoListTitleAC(title,id))
            })
    }
}

//types

export type TodoListType = {
    id: string
    title: string
    filter: TitleType
}

export type AddTodolistActionType = ReturnType<typeof addTodoListAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodoListAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type ACType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListEntityStatusAC>
    | SetTodolistsActionType


const initialState: Array<TodoListDomainType> = []
export type TodoListDomainType = TodoListTypeRes & {
    filter: TitleType,
    entityStatus: RequestStatusType
}

type ThunkDispatch = Dispatch<ACType | SetStatusAT>