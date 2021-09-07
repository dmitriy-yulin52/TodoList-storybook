import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../state/task-reducer";
import {todoListReducer} from "../state/todoList-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    tasks:taskReducer,
    todoLists:todoListReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
