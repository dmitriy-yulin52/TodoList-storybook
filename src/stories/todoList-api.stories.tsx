import React, {useEffect, useState} from 'react'
//
// import {TodoListApi} from "../api/todoList-api";
//
// export default {
//     title: 'API'
// }
//
//
//
// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         TodoListApi.getTodoLists()
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         TodoListApi.createTodoList()
//             .then((res) => {
//                 setState(res.data);
//             }).catch((err)=> console.log(err))
//
//
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         TodoListApi.deleteTodoLists()
//             .then( (res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         TodoListApi.updateTodoListsTitle()
//             .then((res) => {
//                 setState(res.data)
//             })
//
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }