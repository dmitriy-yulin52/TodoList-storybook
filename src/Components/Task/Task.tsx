import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from "../../api/todoList-api";


export type PropsType = {
    task: TaskType
    todoListId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}


export const Task = React.memo((props: PropsType) => {


        const onClickHandler = useCallback(() => {
            props.removeTask(props.task.id,props.todoListId)
        },[props.task.id,props.todoListId])
        const onChangeHandler = useCallback((e:ChangeEvent<HTMLInputElement>)=> {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(props.task.id,newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,props.todoListId)
        },[props.task.id,props.todoListId])
        const onTitleChangeHandler = useCallback((newValue: string) => {
            props.changeTaskTitle(props.task.id,newValue,props.todoListId)
        },[props.task.id,props.todoListId])

        return (
            <React.Fragment>
                <li className={'list'}>
                    <Checkbox
                        color={'primary'}
                        checked={props.task.status === TaskStatuses.Completed}
                        onChange={onChangeHandler}
                        size={'small'}
                    />
                    <EditableSpan
                        value={props.task.title}
                        onChange={onTitleChangeHandler}
                    />
                    <IconButton
                        onClick={onClickHandler}
                        size={'small'}
                        color={'primary'}
                    >
                        <Delete/>
                    </IconButton>
                </li>
            </React.Fragment>
        )
    }
)


