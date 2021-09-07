import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import {AddBox} from '@material-ui/icons';



type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}


export const  AddItemForm = React.memo( ({addItem,disabled = false}: AddItemFormPropsType)=> {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const errorMessage = 'Title is required'


    const addItemHandler = () => {
        const titleTrim = title.trim()
        if (titleTrim) {
            addItem(titleTrim)
        } else {
            setError(errorMessage)
        }
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                value={title}
                disabled={disabled}
                onChange={onChangeHandler}
                onKeyPress={onPressHandler}
                label={'Title'}
                variant={'outlined'}
                size={'small'}
                style={{color: 'white'}}
            />
            <IconButton
                onClick={addItemHandler}
                size={'small'}
                color={'primary'}
                disabled={disabled}
            >
                <AddBox fontSize={'large'}/>
            </IconButton>
            <div
                style={error ? {color: 'red'} : {display: 'none'}}
            >{errorMessage}</div>
        </div>
    )
})

