import React from 'react';

import {Task} from "../Components/Task/Task";
import {action} from "@storybook/addon-actions";

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


export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'JS'}}
            todoListId={'todoListId1'}
            removeTaskHandler={removeTaskCallback}
            isDoneHandler={changeTaskStatusCallback}
            changeTitleHandler={changeTaskTitleCallback}
        />
        <Task
            task={{id: '2', isDone: false, title: 'JS'}}
            todoListId={'todoListId2'}
            removeTaskHandler={removeTaskCallback}
            isDoneHandler={changeTaskStatusCallback}
            changeTitleHandler={changeTaskTitleCallback}
        />
    </>
}