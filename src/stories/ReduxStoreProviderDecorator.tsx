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
import {combineReducers, createStore} from 'redux'
import {taskReducer} from '../state/task-reducer'
import {todoListReducer} from '../state/todoList-reducer'
import {v1} from 'uuid'

const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: todoListReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(),
                title: "HTML&CSS",
                isDone: true
            },
            {id: v1(),
                title: "JS",
                isDone: true
            }
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (storyFn: ()=> React.ReactNode) => (
    <Provider
        store={storyBookStore}
        >{storyFn()}
    </Provider>)