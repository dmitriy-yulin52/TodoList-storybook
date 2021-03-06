import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    TODOLIST_ACTION_TYPE
} from "./todoList-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodoListApi, UpdateTaskModelType} from "../api/todoList-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../app/store";
import {
    setAppErrorAC,
    SetAppErrorAT,
    setAppStatusAC,
    SetAppStatusAT,
} from "../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../utils/error-utils";

export enum ACTION_TYPE {
    REMOVE_TASK = 'task-reducer/REMOVE-TASK',
    ADD_TASK = 'task-reducer/ADD-TASK',
    UPDATE_TASK = 'task-reducer/CHANGE-TASK-STATUS',
    SET_TASKS = 'task-reducer/SET-TASKS',

}

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ACType): TasksStateType => {

    switch (action.type) {
        case ACTION_TYPE.REMOVE_TASK: {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        }
        case ACTION_TYPE.ADD_TASK: {
            // let copyState = {...state}
            // const newTask = {id: v1(), title: action.title, isDone: false}
            // copyState[action.todoListId] = [newTask, ...state[action.todoListId]];
            // return copyState
            // const newTask:TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case ACTION_TYPE.UPDATE_TASK: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }

        case TODOLIST_ACTION_TYPE.ADD_TODOLIST: {
            return {...state, [action.todolist.id]: []}
        }
        case TODOLIST_ACTION_TYPE.REMOVE_TODOLIST: {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        case TODOLIST_ACTION_TYPE.SET_TODOlIST: {
            const copyState = {...state}
            action.todoLists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case ACTION_TYPE.SET_TASKS: {
            return {...state, [action.todolistId]: action.tasks}
        }

        default:
            return state

    }
}


//
// export type RemoveTaskActionACType = {
//     type: ACTION_TYPE.REMOVE_TASK
//     taskId: string
//     todoListId: string
// }
// export type AddTaskACType = {
//     type: ACTION_TYPE.ADD_TASK
//     task: TaskType
// }
// export type changeTaskStatusACType = {
//     type: ACTION_TYPE.CHANGE_TASK_STATUS
//     taskId: string
//     isDone: boolean
//     todoListId: string
// }
// export type addTaskTitleACType = {
//     type: ACTION_TYPE.ADD_TITLE_TASK
//     taskId: string
//     title: string
//     todoListId: string
// }
// export type SetTasksActionType = {
//     type: ACTION_TYPE.SET_TASKS
//     tasks: Array<TaskType>
//     todolistId: string
// }

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ACType =
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

type ThunkDispatch = Dispatch<ACType | SetAppStatusAT | SetAppErrorAT>

//actions
export const RemoveTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: ACTION_TYPE.REMOVE_TASK,
        taskId,
        todoListId
    } as const
}
// export const AddTaskAC = (title: string, todoListId: string): AddTaskACType => {
//     return {
//         type: ACTION_TYPE.ADD_TASK,
//         title,
//         todoListId
//     }
// }
export const AddTaskAC = (task: TaskType) => {
    return {
        type: ACTION_TYPE.ADD_TASK,
        task,
    } as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => {
    return {
        type: ACTION_TYPE.UPDATE_TASK,
        model,
        todoListId,
        taskId
    } as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: ACTION_TYPE.SET_TASKS,
        tasks,
        todolistId
    } as const
}


// export const AddTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
//     return {
//         type: ACTION_TYPE.ADD_TITLE_TASK,
//         title,
//         todoListId,
//         taskId
//     }as const
// }

//thunk
export const fetchTasksTC = (todolistId: string) => {

    return (dispatch: Dispatch<ACType | SetAppStatusAT>) => {
        dispatch(setAppStatusAC('loading'))
        TodoListApi.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ACType | SetAppErrorAT | SetAppStatusAT>) => {
    dispatch(setAppStatusAC('loading'))
    TodoListApi.createTask(todolistId, title)
        .then(res => {
            if(res.data.resultCode === 0){
                const task = res.data.data.item
                const action = AddTaskAC(task)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            }else{
                if(res.data.messages.length){
                    dispatch(setAppErrorAC(res.data.messages[0]))
                }else{
                    dispatch(setAppErrorAC('Network Error'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        }).catch((err)=>{
        dispatch(setAppErrorAC(err.message))
        dispatch(setAppStatusAC('failed'))
    })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ACType>) => {
    TodoListApi.deleteTask(todolistId, taskId)
        .then(res => {
            const action = RemoveTaskAC(taskId, todolistId)
            dispatch(action)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        TodoListApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if(res.data.resultCode === 0){
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                }else{
                    handleServerAppError(res.data,dispatch)
                }
            }).catch((err)=>{
                handleNetworkError(err, dispatch)
        })
    }
