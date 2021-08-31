import React from 'react';

import {Task} from "../Components/Task/Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todoList-api";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../app/store";
import {TasksStateType} from "../state/task-reducer";

export default {
    title: 'TodoList/Task',
    component: Task,
}


const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button inside Task clicked')

// const Template: Story<PropsType> = (args) => <Task {...args} />;
//
//
// const baseArgs = {
//     changeTaskStatus: changeTaskStatusCallback,
//     changeTaskTitle: changeTaskTitleCallback,
//     removeTask: removeTaskCallback,
// }
//
// export const TaskIsDoneExample = Template.bind({});
// TaskIsDoneExample.args = {
//     ...baseArgs,
//     task: {id: '1', isDone: true, title: 'JS'},
//     todoListId: 'todolistId1'
// };
//
// export const TaskIsNotDoneExample = Template.bind({});
// TaskIsNotDoneExample.args = {
//     ...baseArgs,
//     task: {id: '1', isDone: false, title: 'JS'},
//     todoListId: 'todolistId1'
// };
// const tasksStatus = TaskStatuses
//
// export const TaskBaseExample = () => {
//     return <>
//         <Task
//             task={
//                 {
//                     id: '1',
//                     title: 'JS',
//                     description: 'JS',
//                     status: tasksStatus,
//                     priority: TaskPriorities,
//                     startDate: '20:10',
//                     deadline: 'line',
//                     todoListId: v1(),
//                     order: 2,
//                     addedDate: '20:11',
//                 }
//             }
//             todoListId={'todoListId1'}
//             removeTaskHandler={removeTaskCallback}
//             isDoneHandler={changeTaskStatusCallback}
//             changeTitleHandler={changeTaskTitleCallback}
//         />
//         <Task
//             task={
//                 {
//                     id: '1',
//                     title: 'JS',
//                     description: 'JS',
//                     status: Statuses,
//                     priority: Priorities,
//                     startDate: '20:10',
//                     deadline: 'line',
//                     todoListId: v1(),
//                     order: 2,
//                     addedDate: '20:11',
//                 }
//             }
//             todoListId={'todoListId2'}
//             removeTaskHandler={removeTaskCallback}
//             isDoneHandler={changeTaskStatusCallback}
//             changeTitleHandler={changeTaskTitleCallback}
//         />
//     </>
// }