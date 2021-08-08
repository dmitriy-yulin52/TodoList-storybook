import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodoListAT, RemoveTodoListAT, TODOLIST_ACTION_TYPE} from "./todoList-reducer";


const initialState: TasksStateType = {}

export enum ACTION_TYPE {
    REMOVE_TASK = 'task-reducer/REMOVE-TASK',
    ADD_TASK = 'task-reducer/ADD-TASK',
    CHANGE_TASK_STATUS = 'task-reducer/CHANGE-TASK-STATUS',
    ADD_TITLE_TASK = 'task-reducer/ADD-TITLE-TASK',
}

export type RemoveTaskActionACType = {
    type: ACTION_TYPE.REMOVE_TASK
    taskId: string
    todoListId: string
}
export type AddTaskACType = {
    type: ACTION_TYPE.ADD_TASK
    title: string
    todoListId: string
}
export type changeTaskStatusACType = {
    type: ACTION_TYPE.CHANGE_TASK_STATUS
    taskId: string
    isDone: boolean
    todoListId: string
}
export type addTaskTitleACType = {
    type: ACTION_TYPE.ADD_TITLE_TASK
    taskId: string
    title: string
    todoListId: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export type ACType =
    RemoveTaskActionACType
    | AddTaskACType
    | changeTaskStatusACType
    | addTaskTitleACType
    | AddTodoListAT
    | RemoveTodoListAT


export const taskReducer = (state: TasksStateType = initialState, action: ACType) => {

    switch (action.type) {
        case ACTION_TYPE.REMOVE_TASK: {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter((task) => {
                return task.id !== action.taskId
            })
            return copyState
        }
        case ACTION_TYPE.ADD_TASK: {
            let copyState = {...state}
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoListId] = [newTask, ...state[action.todoListId]];
            return copyState
            // const newTask:TaskType = {id: v1(), title: action.title, isDone: false}
            // return {...state, [action.todoListId]: [newTask,...state[action.todoListId]]}
        }
        case ACTION_TYPE.CHANGE_TASK_STATUS: {
            // const copyState = {...state}
            // copyState[action.todoListId] = copyState[action.todoListId].map((task) => {
            //     if (task.id === action.taskId) {
            //         return {...task, isDone: action.isDone}
            //     }
            //     return task
            // })
            // return copyState
            const copyTask = state[action.todoListId]
            state[action.todoListId] = copyTask.map(el=>el.id === action.taskId ? {...el,isDone:action.isDone}:el)
            return {...state}
        }
        case ACTION_TYPE.ADD_TITLE_TASK: {
            const copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].map((task) => {
                if (task.id === action.taskId) {
                    return {...task, title: action.title}
                }
                return task
            })
            return copyState
        }
        case TODOLIST_ACTION_TYPE.ADD_TODOLIST: {
            return {...state, [action.todoListId]: []}
        }
        case TODOLIST_ACTION_TYPE.REMOVE_TODOLIST: {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        default:
            return state

    }
}

export const RemoveTaskAC = (taskId: string, todoListId: string): RemoveTaskActionACType => {
    return {
        type: ACTION_TYPE.REMOVE_TASK,
        taskId,
        todoListId
    }
}
export const AddTaskAC = (title: string, todoListId: string): AddTaskACType => {
    return {
        type: ACTION_TYPE.ADD_TASK,
        title,
        todoListId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): changeTaskStatusACType => {
    return {
        type: ACTION_TYPE.CHANGE_TASK_STATUS,
        isDone,
        todoListId,
        taskId
    }
}
export const AddTaskTitleAC = (taskId: string, title: string, todoListId: string): addTaskTitleACType => {
    return {
        type: ACTION_TYPE.ADD_TITLE_TASK,
        title,
        todoListId,
        taskId
    }
}
export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {
        type: TODOLIST_ACTION_TYPE.ADD_TODOLIST,
        title: title,
        todoListId: v1()
    }
}
export const RemoveTodolistAC = (todoListId: string): RemoveTodoListAT => {
    return {
        type: TODOLIST_ACTION_TYPE.REMOVE_TODOLIST,
        todoListId
    }
}
