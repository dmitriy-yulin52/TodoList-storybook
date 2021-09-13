import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../app/app-reducer";
import {ResponseType} from "../api/todoList-api";
import {Dispatch} from "redux";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>)=> {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    }else{
        dispatch(setAppErrorAC('Network Error'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleNetworkError = (err: {message: string},dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>)=> {
    dispatch(setAppErrorAC(err.message ? err.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}