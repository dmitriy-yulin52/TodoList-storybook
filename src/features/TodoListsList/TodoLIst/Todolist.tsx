import React, {useCallback, useEffect, useState} from 'react'
import {EditableSpan} from "../../../Components/Task/EditableSpan/EditableSpan";
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "../../../Components/Task/Task";
import {
    fetchTasksTC,
} from "../../../state/task-reducer";
import {useDispatch} from "react-redux";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {TitleType, TodoListDomainType} from "../../../state/todoList-reducer";
import {TaskStatuses, TaskType} from "../../../api/todoList-api";
import {Preloader} from "../../../Preloader/Preloader";


type TodoListPropsType = {
    todoList: TodoListDomainType
    // title: string
    // filter: TitleType
    // todoListId: string
    changeFilter: (value: TitleType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    demo?:boolean
}


export const Todolist = React.memo(({demo = false,...props}: TodoListPropsType) => {



    const dispatch = useDispatch()

    useEffect(() => {
        if(demo){
            return
        }
        const thunk = fetchTasksTC(props.todoList.id)
        dispatch(thunk)
    }, [])

    let addTask = useCallback((title: string) => {
        props.addTask(title, props.todoList.id)
    }, [props.addTask, props.todoList.id])


    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todoList.id)
    }, [props.removeTodoList, props.todoList.id])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoList.id)
    }, [props.changeTodoListTitle, props.todoList.id])


    const onAllClickHandler = useCallback(() => {
        props.changeFilter('All', props.todoList.id)
    }, [props.changeFilter, props.todoList.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('Active', props.todoList.id)
    }, [props.changeFilter, props.todoList.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('Completed', props.todoList.id)
    }, [props.changeFilter, props.todoList.id])

    let tasksForTodoList = props.tasks;
    if (props.todoList.filter === 'Active') {
        tasksForTodoList = props.tasks.filter(el => el.status === TaskStatuses.New)
    }
    if (props.todoList.filter === 'Completed') {
        tasksForTodoList = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }


    return (
        <div className="App">
            <div className={'toDoList'}>
                <h3 className={'listTitle'}>
                    <EditableSpan
                        value={props.todoList.title}
                        onChange={changeTodoListTitle}
                    />
                    <IconButton
                        onClick={removeTodoList}
                        size={'small'}
                        color={'primary'}
                        disabled={props.todoList.entityStatus === 'loading'}
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
                                return (
                                    <>
                                        <Task
                                            task={t}
                                            todoListId={props.todoList.id}
                                            key={t.id}
                                            removeTask={props.removeTask}
                                            changeTaskStatus={props.changeTaskStatus}
                                            changeTaskTitle={props.changeTaskTitle}
                                        />
                                    </>

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
                        color={props.todoList.filter === 'All' ? 'secondary' : 'primary'}
                    >
                        All
                    </Button>
                    <Button
                        style={{margin: '0 3px'}}
                        size={'small'}
                        variant={'contained'}
                        onClick={onActiveClickHandler}
                        color={props.todoList.filter === 'Active' ? 'secondary' : 'primary'}
                    >
                        Active
                    </Button>
                    <Button
                        size={'small'}
                        variant={'contained'}
                        onClick={onCompletedClickHandler}
                        color={props.todoList.filter === 'Completed' ? 'secondary' : 'primary'}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})
