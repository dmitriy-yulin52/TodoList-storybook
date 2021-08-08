import React, {useReducer, useState} from 'react';
// import './App.css';
// import {TaskType, Todolist} from "./Todolist";
// import {v1} from "uuid";
// import AddItemForm from "./AddItemForm";
// import AppBar from '@material-ui/core/AppBar';
// import {IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
// import {Menu} from '@material-ui/icons';
// import {
//     addTodoListAC,
//     changeTodoListFilterAC,
//     changeTodoListTitleAC,
//     removeTodoListAC,
//     todoListReducer
// } from "./state/todoList-reducer";
// import {AddTaskAC, AddTaskTitleAC, changeTaskStatusAC, RemoveTaskAC, taskReducer} from "./state/task-reducer";
//
// export type TitleType = "All" | "Active" | "Completed"
//
//
// export type ToDoListType = {
//     id: string
//     title: string
//     filter: TitleType
// }
//
//  export type TaskStateType = {
//     [key: string]: Array<TaskType>
// }
//
// function AppWithReducers() {
//
//     const todoListId_1 = v1()
//     const todoListId_2 = v1()
//
//     const [todoLists, dispatchToTodoLists] = useReducer(todoListReducer,[
//         {id: todoListId_1, title: 'What to learn', filter: 'All'},
//         {id: todoListId_2, title: 'What to buy', filter: 'All'}
//     ])
//     const [tasks, dispatchToTasks] = useReducer(taskReducer,{
//         [todoListId_1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'React', isDone: false},
//             {id: v1(), title: 'Redux', isDone: true},
//             {id: v1(), title: 'MobX', isDone: true},
//             {id: v1(), title: 'JS', isDone: false},
//             {id: v1(), title: 'WebPack', isDone: true},
//         ],
//         [todoListId_2]: [
//             {id: v1(), title: 'Book', isDone: false},
//             {id: v1(), title: 'NoteBook', isDone: true},
//             {id: v1(), title: 'Redux', isDone: true},
//             {id: v1(), title: 'Car', isDone: false},
//             {id: v1(), title: 'Btc', isDone: false},
//             {id: v1(), title: 'Phone', isDone: false},
//         ]
//     })
//
//
//     const removeTasks = (Mid: string, todoListId: string) => {
//         let action = RemoveTaskAC(Mid,todoListId)
//         dispatchToTasks(action)
//     }
//     const addTask = (title: string, todoListId: string) => {
//         let action = AddTaskAC(title,todoListId)
//         dispatchToTasks(action)
//     }
//     const isDoneChange = (Mid: string, newIsDone: boolean, todoListId: string) => {
//         let action = changeTaskStatusAC(Mid,newIsDone,todoListId)
//         dispatchToTasks(action)
//     }
//     const changeTaskTitle = (Mid: string, title: string, todoListId: string) => {
//         let action = AddTaskTitleAC(Mid,title,todoListId)
//         dispatchToTasks(action)
//     }
//
//     const changeTodoListFilter = (title: TitleType, todoListId: string) => {
//         let action = changeTodoListFilterAC(title,todoListId)
//         dispatchToTodoLists(action)
//     }
//     const removeTodoList = (todoListId: string) => {
//         let action = removeTodoListAC(todoListId)
//         dispatchToTodoLists(action)
//         delete tasks[todoListId]
//     }
//     const addTodolist = (title: string) => {
//         let action = addTodoListAC(title)
//         dispatchToTodoLists(action)
//         dispatchToTasks(action)
//     }
//     const changeTodoListTitle = (title: string, todoListId: string) => {
//         let action = changeTodoListTitleAC(title,todoListId)
//         dispatchToTodoLists(action)
//     }
//
//
//     const todoListsElements = todoLists.map(tl => {
//
//         let tasksForTodoList = tasks[tl.id];
//         if (tl.filter === 'Active') {
//             tasksForTodoList = tasks[tl.id].filter(el => !el.isDone)
//         }
//         if (tl.filter === 'Completed') {
//             tasksForTodoList = tasks[tl.id].filter(el => el.isDone)
//         }
//
//         return (
//             <Grid item key={tl.id}>
//                 <Paper style={{padding: '10px'}} elevation={5}>
//                     <Todolist
//                         todoListId={tl.id}
//                         filter={tl.filter}
//                         title={tl.title}
//                         tasks={tasksForTodoList}
//                         addTask={addTask}
//                         removeTasks={removeTasks}
//                         changeTodoListFilter={changeTodoListFilter}
//                         isDoneChange={isDoneChange}
//                         removeTodoList={removeTodoList}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodoListTitle={changeTodoListTitle}
//                     />
//                 </Paper>
//             </Grid>
//         )
//     })
//
//     const gridStyle = {
//         padding: '10px 0',
//     }
//
//     return (
//         <div className={'App'}>
//             <AppBar position="static">
//                 <Toolbar style={{justifyContent: 'space-between'}}>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         TodoList
//                     </Typography>
//                     <Button
//                         color="inherit"
//                         variant={'outlined'}
//                     >Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={gridStyle}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {todoListsElements}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
