import React from 'react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {App} from "../app/App";


export default {
    title:'AppWithRedux',
    component:App,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = ()=>{
    return <>
        <App/>
    </>
}
