import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {TextField} from '@material-ui/core'


type EditableSpanPropsType = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('editableSpan')

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }


    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            activateViewMode()
        }

    }

    return (
        editMode
            ? <TextField
                value={title}
                autoFocus
                onBlur={activateViewMode}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}
                size={'small'}
                style={{color: 'white'}}
            />
            : <span
                onDoubleClick={activateEditMode}
            >
                    {props.value}
            </span>
    )
})
