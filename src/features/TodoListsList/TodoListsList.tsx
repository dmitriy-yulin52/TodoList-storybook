import {Grid, Paper} from "@material-ui/core";
import React, {useCallback, useEffect} from "react";
import {Todolist} from "./TodoLIst/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC,
    removeTodolistTC, TitleType, TodoListDomainType,
} from "../../state/todoList-reducer";
import {AddItemForm} from "./TodoLIst/AddItemForm/AddItemForm";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../../state/task-reducer";
import {TaskStatuses} from "../../api/todoList-api";


export const TodoListsList = () => {


    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])
    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [])
    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, []) //

    const changeFilter = useCallback((value: TitleType, todoListId: string) => {
        let thunk = changeTodoListFilterAC(value, todoListId)
        dispatch(thunk)
    }, [dispatch]) //
    const removeTodoList = useCallback((id: string) => {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, []) //
    const addTodolist = useCallback((title: string) => {
        let thunk = addTodolistTC(title)
        dispatch(thunk)
    }, []) //
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        let thunk = changeTodolistTitleTC(title, todoListId)
        dispatch(thunk)
    }, []) //




    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {
                    todoLists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}} elevation={5}>
                                    <Todolist
                                        todoListId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        changeFilter={changeFilter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                        addTask={addTask}
                                        tasks={allTodolistTasks}
                                        changeTaskStatus={changeStatus}
                                        removeTask={removeTask}
                                        changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
            </Grid>
        </>
    )
}