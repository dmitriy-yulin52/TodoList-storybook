import { combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListReducer} from "./todoList-reducer";


const rootReducer = combineReducers({
    tasks:taskReducer,
    todoLists:todoListReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
