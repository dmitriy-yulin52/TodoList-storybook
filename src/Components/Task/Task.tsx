import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {IconButton, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch} from "react-redux";
import {AddTaskTitleAC, changeTaskStatusAC, RemoveTaskAC} from "../../state/task-reducer";
import {TaskType} from "../../features/TodoListsList/TodoLIst/Todolist";


export type PropsType = {
    task: TaskType
    todoListId: string
    removeTaskHandler: () => void
    isDoneHandler: (isDone:boolean) => void
    changeTitleHandler: (title: string) => void
}


export const Task = React.memo((props: PropsType) => {
        console.log('task')


        // const removeTaskHandler = useCallback(() => {
        //     dispatch(RemoveTaskAC(props.task.id, props.todoListId))
        // },[RemoveTaskAC,props.task.id,props.todoListId])
        // const isDoneHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        //     dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todoListId))
        // },[changeTaskStatusAC,props.task.id,props.todoListId])
        // const changeTitleHandler = useCallback((title: string) => {
        //     dispatch(AddTaskTitleAC(props.task.id, title, props.todoListId))
        // },[AddTaskTitleAC,props.task.id,props.todoListId])


        // const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //     props.isDoneHandler(e.currentTarget.checked)
        // }
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
                        checked={props.task.isDone}
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


