import React from 'react'
import {AddItemForm} from "../features/TodoListsList/TodoLIst/AddItemForm/AddItemForm";
import {Meta,Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled:boolean
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

const TemplateDisabled:Story<AddItemFormPropsType> = (args)=> <AddItemForm {...args}/>


export const AddItemFormBaseExampleDisabled = TemplateDisabled.bind({})

AddItemFormBaseExampleDisabled.args = {
    addItem: action('Button inside form clicked'),
    disabled:true
}
