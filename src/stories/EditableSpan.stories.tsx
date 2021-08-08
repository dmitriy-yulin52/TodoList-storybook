import React from 'react';
import {EditableSpan} from "../Components/Task/EditableSpan/EditableSpan";
import {action} from "@storybook/addon-actions";


export default {
    title:'Task/EditableSpan',
    component:EditableSpan
}


const changeTitleCallback = action('Title changed')


export const EditableSpanBaseExample = ()=>{
    return <>
        <EditableSpan
            title={'Hello World!'}
            changeTitle={changeTitleCallback}
        />
    </>
}
