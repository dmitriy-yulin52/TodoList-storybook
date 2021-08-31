import React from 'react';
import {AppWithRedux} from "../app/App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title:'AppWithRedux',
    component:AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = ()=>{
    return <>
        <AppWithRedux/>
    </>
}
