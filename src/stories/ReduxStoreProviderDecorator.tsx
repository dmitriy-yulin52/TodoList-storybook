// import React from 'react'
// import {Provider} from "react-redux";
// import {store} from "../state/store";
//
// export const ReduxStoreProviderDecorator = (story: any) => {
//     return <Provider store={store}>{story()}</Provider>
//
//
// }

import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {taskReducer} from '../state/task-reducer'
import {todoListReducer} from '../state/todoList-reducer'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from "../api/todoList-api";

import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: todoListReducer,
    app: appReducer
})


const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", addedDate: "", order: 0, filter: 'All',entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", addedDate: "", order: 0, filter: 'All',entityStatus: 'loading'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 2,
                addedDate: ''
            },
            {
                id: v1(),
                title: "HTML&CSS",
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 2,
                addedDate: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 2,
                addedDate: ''
            },
            {
                id: v1(),
                title: "HTML&CSS",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 2,
                addedDate: ''
            }
        ]
    },
    app: {
        error: null,
        status: 'idle'
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as any , applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}
    >{storyFn()}
    </Provider>)