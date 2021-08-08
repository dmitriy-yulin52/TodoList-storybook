import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {TextField} from '@material-ui/core'


type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('editableSpan')

    const [editMode, setEditMode] = useState<boolean>(false)
    const [titleSpan, setTitleSpan] = useState<string>('')

    const onEditMode = () => {
        setEditMode(true)
        setTitleSpan('')
    }
    const offEditMode = () => {
        if (titleSpan) {
            props.changeTitle(titleSpan)
        } else {
            setTitleSpan(props.title)
        }
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleSpan(e.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            offEditMode()
        }

    }

    return (

        editMode
            ? <TextField
            value={titleSpan}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size={'small'}
                style={{color: 'white'}}
            />
            : <span
                onDoubleClick={onEditMode}
            >
                    {props.title}
            </span>
    )
})
