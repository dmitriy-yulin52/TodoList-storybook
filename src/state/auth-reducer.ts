import {AppRootStateType} from "../app/store";

export enum AUTH_ACTION_TYPE {
    SET_LOGIN = 'auth-reducer/SET_LOGIN'
}


export const InitialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    resultCode: null as number | null,
    messages: [],
    isAuth: false,
    captchaUrl: null,
}

export type InitialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    resultCode: number | null,
    messages: string[],
    captchaUrl: string | null
}

export const AuthReducer = (state: InitialStateType = InitialState, action: AuthActionsType) => {
    switch (action.type) {
        case AUTH_ACTION_TYPE.SET_LOGIN:
            return {
                ...state,
                ...action.payload
            }
    }
}


export const setLoginAC = (email: string, login: string, rememberMe: boolean, captchaUrl: string | null) => {
    return {
        type: AUTH_ACTION_TYPE.SET_LOGIN,
        payload: {
            email,
            login,
            rememberMe,
            captchaUrl,
        }
    }
}

type AuthActionsType = ReturnType<typeof setLoginAC>