import React from 'react';
import {Meta, Story} from '@storybook/react';

import {PropsType, Task} from "../Components/Task/Task";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Task',
  component: Task,
} as Meta


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
  task:{id: '1',isDone: true, title:'JS'},
  todoListId: 'todolistId1'
};

export const TaskIsDoneNotExample = Template.bind({});
TaskIsDoneNotExample.args = {
  ...baseArgs,
  task:{id: '1',isDone: false, title:'JS'},
  todoListId: 'todolistId1'
};
