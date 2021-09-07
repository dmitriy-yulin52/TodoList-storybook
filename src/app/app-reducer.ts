import React from 'react'


enum APP_ACTION_TYPE {
    SET_STATUS = 'app-reducer/SET_STATUS',
    SET_ERROR = 'app-reducer/SET_ERROR'
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case APP_ACTION_TYPE.SET_STATUS:
            return {...state, status: action.status}
        case APP_ACTION_TYPE.SET_ERROR:
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: APP_ACTION_TYPE.SET_ERROR,
        error
    } as const
}
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: APP_ACTION_TYPE.SET_STATUS,
        status
    } as const
}


export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>

type ActionsType =
    | SetAppErrorAT
    | SetAppStatusAT



