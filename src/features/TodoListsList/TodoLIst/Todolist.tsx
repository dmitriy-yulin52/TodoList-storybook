import React, {useCallback, useEffect} from 'react'
import {EditableSpan} from "../../../Components/Task/EditableSpan/EditableSpan";
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TitleType} from '../../../app/App';

import {Task} from "../../../Components/Task/Task";
import {AddTaskAC, AddTaskTitleAC, changeTaskStatusAC, fetchTasksTC, RemoveTaskAC} from "../../../state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {AppRootStateType} from "../../../app/store";
import {fetchTodolistsThunkTC} from "../../../state/todoList-reducer";

export type TaskType = {
    title: string
    isDone: boolean
    id: string

}
type TodoListPropsType = {
    title: string
    filter: TitleType
    todoListId: string
    changeTodoListFilter: (title: TitleType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


export const Todolist = React.memo((props: TodoListPropsType) => {
    console.log('todoLIst')


    const onAllClickHandler = useCallback(() => {
        props.changeTodoListFilter('All', props.todoListId)
    }, [props.changeTodoListFilter, props.todoListId])
    const onActiveClickHandler = useCallback(() => {
        props.changeTodoListFilter('Active', props.todoListId)
    }, [props.changeTodoListFilter, props.todoListId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeTodoListFilter('Completed', props.todoListId)
    }, [props.changeTodoListFilter, props.todoListId])


    const onClickRemoveTodoList = useCallback(() => {
        props.removeTodoList(props.todoListId)
    }, [props.removeTodoList, props.todoListId])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }, [props.changeTodoListTitle, props.todoListId])


    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch()

    let tasksForTodoList = tasks;
    if (props.filter === 'Active') {
        tasksForTodoList = tasks.filter(el => !el.isDone)
    }
    if (props.filter === 'Completed') {
        tasksForTodoList = tasks.filter(el => el.isDone)
    }
    let addTask = useCallback((title: string) => {
        dispatch(AddTaskAC(title, props.todoListId))
    }, [dispatch, props.todoListId])



    useEffect(()=>{
        const thunk = fetchTodolistsThunkTC()
        dispatch(thunk)
    },[])

    return (
        <div className="App">
            <div className={'toDoList'}>
                <h3 className={'listTitle'}>
                    <EditableSpan
                        title={props.title}
                        changeTitle={changeTodoListTitle}
                    />
                    <IconButton
                        onClick={onClickRemoveTodoList}
                        size={'small'}
                        color={'primary'}
                    >
                        <Delete fontSize={'small'}/>
                    </IconButton>
                </h3>
                <div>
                    <AddItemForm addItem={addTask}/>
                </div>
                <React.Fragment>
                    <ul>
                        {

                            tasksForTodoList.map((t) => {
                                const removeTaskHandler = () => {
                                    dispatch(RemoveTaskAC(t.id, props.todoListId))
                                }
                                const isDoneHandler = (isDone:boolean) => {
                                    dispatch(changeTaskStatusAC(t.id, isDone, props.todoListId))
                                }
                                const changeTitleHandler = (title: string) => {
                                    dispatch(AddTaskTitleAC(t.id, title, props.todoListId))
                                }
                                return (
                                    <Task
                                        task={t}
                                        todoListId={props.todoListId}
                                        key={t.id}
                                        removeTaskHandler={removeTaskHandler}
                                        isDoneHandler={isDoneHandler}
                                        changeTitleHandler={changeTitleHandler}
                                    />
                                )
                            })
                        }
                    </ul>
                </React.Fragment>

                <div className={'btnFilter'}>
                    <Button
                        size={'small'}
                        variant={'contained'}
                        onClick={onAllClickHandler}
                        color={props.filter === 'All' ? 'secondary' : 'primary'}
                    >
                        All
                    </Button>
                    <Button
                        style={{margin: '0 3px'}}
                        size={'small'}
                        variant={'contained'}
                        onClick={onActiveClickHandler}
                        color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    >
                        Active
                    </Button>
                    <Button
                        size={'small'}
                        variant={'contained'}
                        onClick={onCompletedClickHandler}
                        color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})
