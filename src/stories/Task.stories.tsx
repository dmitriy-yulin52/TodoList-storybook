import React from 'react';

import {PropsType, Task} from "../Components/Task/Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todoList-api";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../app/store";
import {TasksStateType} from "../state/task-reducer";
import {Story} from "@storybook/react";

export default {
    title: 'TodoList/Task',
    component: Task,
}


const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button inside Task clicked')

const Template: Story<PropsType> = (args) => <Task {...args} />;


const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1',
        description: '',
        title: 'JS',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 4,
        addedDate: '',
    },
    todoListId: 'todolistId1'
};



export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1',
        description: '',
        title: 'JS',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: '1',
        order: 4,
        addedDate: '',},
    todoListId: 'todolistId1'
};


export const TaskBaseExample = () => {
    return <>
        <Task
            task={
                {
                    id: '1',
                    description: '',
                    title: 'JS',
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: '1',
                    order: 4,
                    addedDate: '',
                }
            }
            todoListId={'todoListId1'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
        <Task
            task={
                {
                    id: '1',
                    title: 'JS',
                    description: 'JS',
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Middle,
                    startDate: '20:10',
                    deadline: 'line',
                    todoListId: v1(),
                    order: 2,
                    addedDate: '20:11',
                }
            }
            todoListId={'todoListId2'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
    </>
}