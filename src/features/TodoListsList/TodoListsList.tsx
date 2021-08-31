import {Grid, Paper} from "@material-ui/core";
import React, {useCallback, useEffect} from "react";
import {Todolist} from "./TodoLIst/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, fetchTodolistsThunkTC,
    removeTodoListAC,
    TodoListType
} from "../../state/todoList-reducer";
import {TitleType} from "../../app/App";
import {AddItemForm} from "./TodoLIst/AddItemForm/AddItemForm";


export const TodoListsList = () => {


    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
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
                                        filter={tl.filter}
                                        title={tl.title}
                                        changeTodoListFilter={changeTodoListFilter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
            </Grid>
        </>
    )
}