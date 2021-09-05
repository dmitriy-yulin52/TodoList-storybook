import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Typography, Button, Toolbar, Container, LinearProgress} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";




export const App = React.memo(() => {

    return (
        <div className={'App'}>
            <ErrorSnackBar/>
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
                {/*<LinearProgress />*/}
            </AppBar>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>
    );
})

