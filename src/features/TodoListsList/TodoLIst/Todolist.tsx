import React, {useCallback, useEffect} from 'react'
import {EditableSpan} from "../../../Components/Task/EditableSpan/EditableSpan";
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "../../../Components/Task/Task";
import {
    fetchTasksTC,
    RemoveTaskAC,
} from "../../../state/task-reducer";
import {useDispatch} from "react-redux";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {TitleType} from "../../../state/todoList-reducer";
import {TaskStatuses, TaskType} from "../../../api/todoList-api";


type TodoListPropsType = {
    title: string
    filter: TitleType
    todoListId: string
    changeFilter: (value: TitleType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    addTask: (title:string,todoListId:string) => void
    tasks:Array<TaskType>
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}


export const Todolist = React.memo((props: TodoListPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const thunk = fetchTasksTC(props.todoListId)
        dispatch(thunk)
    }, [props.todoListId])

    let addTask = useCallback((title: string) => {
        props.addTask(title,props.todoListId)
    }, [props.addTask, props.todoListId])


    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todoListId)
    }, [props.removeTodoList, props.todoListId])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }, [props.changeTodoListTitle, props.todoListId])


    const onAllClickHandler = useCallback(() => {
        props.changeFilter('All', props.todoListId)
    }, [props.changeFilter, props.todoListId])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('Active', props.todoListId)
    }, [props.changeFilter, props.todoListId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('Completed', props.todoListId)
    }, [props.changeFilter, props.todoListId])

    let tasksForTodoList = props.tasks;
    if (props.filter === 'Active') {
        tasksForTodoList = props.tasks.filter(el => el.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        tasksForTodoList = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }


    return (
        <div className="App">
            <div className={'toDoList'}>
                <h3 className={'listTitle'}>
                    <EditableSpan
                        value={props.title}
                        onChange={changeTodoListTitle}
                    />
                    <IconButton
                        onClick={removeTodoList}
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

                                return (
                                    <Task
                                        task={t}
                                        todoListId={props.todoListId}
                                        key={t.id}
                                        removeTask={props.removeTask}
                                        changeTaskStatus={props.changeTaskStatus}
                                        changeTaskTitle={props.changeTaskTitle}
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
