import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from "../../api/todoList-api";


export type PropsType = {
    task: TaskType
    todoListId: string
    removeTaskHandler: () => void
    isDoneHandler: (isDone:boolean) => void
    changeTitleHandler: (title: string) => void
}


export const Task = React.memo((props: PropsType) => {


        const removeTask = () => {
            props.removeTaskHandler()
        }
        const onChangeIsDoneHandler = (e:ChangeEvent<HTMLInputElement>)=> {
            props.isDoneHandler(e.currentTarget.checked)
        }
        const changeTitle = useCallback((title: string) => {
            props.changeTitleHandler(title)
        },[props.changeTitleHandler])

        return (
            <React.Fragment>
                <li className={'list'}>
                    <Checkbox
                        color={'primary'}
                        checked={props.task.status === TaskStatuses.Completed}
                        onChange={onChangeIsDoneHandler}
                        size={'small'}
                    />
                    <EditableSpan
                        title={props.task.title}
                        changeTitle={changeTitle}
                    />
                    <IconButton
                        onClick={removeTask}
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


