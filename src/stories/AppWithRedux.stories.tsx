import React from 'react';
import {action} from "@storybook/addon-actions";
import {AppWithRedux} from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title:'AppWithRedux',
    component:AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}




export const AppWithReduxBaseExample = ()=>{
    return <>
        <Provider store={store}>
        <AppWithRedux/>
        </Provider>

    </>
}
