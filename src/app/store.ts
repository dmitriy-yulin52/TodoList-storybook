import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../state/task-reducer";
import {todoListReducer} from "../state/todoList-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks:taskReducer,
    todoLists:todoListReducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
