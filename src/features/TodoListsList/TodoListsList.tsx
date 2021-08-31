import {Grid, Paper} from "@material-ui/core";
import React, {useCallback, useEffect} from "react";
import {Todolist} from "./TodoLIst/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, fetchTodolistsThunkTC,
    removeTodoListAC, TitleType, TodoListDomainType,
} from "../../state/todoList-reducer";
import {AddItemForm} from "./TodoLIst/AddItemForm/AddItemForm";
import {addTaskTC} from "../../state/task-reducer";


export const TodoListsList = () => {


    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const dispatch = useDispatch()

    const changeTodoListFilter = useCallback((title: TitleType, todoListId: string) => {
        let action = changeTodoListFilterAC(title, todoListId)
        dispatch(action)
    }, [dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        let action = changeTodoListTitleAC(title, todoListId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string)=>{
        const thunk = addTaskTC(title,todolistId)
        dispatch(thunk)
    },[])

    useEffect(() => {
        dispatch(fetchTodolistsThunkTC())
    }, [])
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {
                    todoLists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}} elevation={5}>
                                    <Todolist
                                        todoListId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        changeTodoListFilter={changeTodoListFilter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                        addTask={addTask}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
            </Grid>
        </>
    )
}