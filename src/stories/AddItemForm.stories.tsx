import React from 'react'
import {AddItemForm} from "../Components/TodoLIst/AddItemForm/AddItemForm";
import {Meta,Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export default{
    title: 'TodoLIst/AddItemForm',
    component: AddItemForm,
    argTypes:{
        onClick:{
            description:'Button inside form clicked'
        }
    },
} as Meta


// const callback = action('Button inside form clicked')

const Template:Story<AddItemFormPropsType> = (args)=> <AddItemForm {...args}/>


export const AddItemFormBaseExample = Template.bind({})

AddItemFormBaseExample.args = {
    addItem: action('Button inside form clicked')
}
