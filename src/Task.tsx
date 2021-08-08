import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from "./EditableSpan";
import {IconButton, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch} from "react-redux";
import {AddTaskTitleAC, changeTaskStatusAC, RemoveTaskAC} from "./state/task-reducer";
import {TaskType} from "./Todolist";


type PropsType = {
    task: TaskType
    todoListId: string
}


export const Task = React.memo((props: PropsType) => {
        console.log('task')

    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(RemoveTaskAC(props.task.id, props.todoListId))
    },[RemoveTaskAC,props.task.id,props.todoListId])
    const isDoneHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todoListId))
    },[changeTaskStatusAC,props.task.id,props.todoListId])
    const changeTitleHandler = useCallback((title: string) => {
        dispatch(AddTaskTitleAC(props.task.id, title, props.todoListId))
    },[AddTaskTitleAC,props.task.id,props.todoListId])
        return (
            <React.Fragment>
                <li className={'list'}>
                    <Checkbox
                        color={'primary'}
                        checked={props.task.isDone}
                        onChange={isDoneHandler}
                        size={'small'}
                    />
                    <EditableSpan 
                                  title={props.task.title}
                                  changeTitle={changeTitleHandler}
                    />
                    <IconButton
                        onClick={removeTaskHandler}
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


