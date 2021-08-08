import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, ToDoListType,
} from "./state/todoList-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TitleType = "All" | "Active" | "Completed"


export const AppWithRedux = React.memo(()=> {
    console.log('AppWithRedux')

    const todoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state=>state.todoLists)
    const dispatch = useDispatch()

    const changeTodoListFilter = useCallback((title: TitleType, todoListId: string)=> {
        let action = changeTodoListFilterAC(title,todoListId)
        dispatch(action)
    },[dispatch])
    const removeTodoList = useCallback((todoListId: string)=> {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
    },[dispatch])
    const addTodolist = useCallback((title: string)=> {
        let action = addTodoListAC(title)
        dispatch(action)
    },[dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string)=> {
        let action = changeTodoListTitleAC(title,todoListId)
        dispatch(action)
    },[dispatch])



    const todoListsElements = todoLists.map(tl => {
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
    })

    const gridStyle = {
        padding: '10px 0',
    }

    return (
        <div className={'App'}>
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button
                        color="inherit"
                        variant={'outlined'}
                    >
                        Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={gridStyle}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsElements}
                </Grid>
            </Container>
        </div>
    );
})

