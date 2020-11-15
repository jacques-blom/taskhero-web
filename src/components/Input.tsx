import React, {useState} from 'react'
import styled from 'styled-components'
import {mutate} from 'swr'
import {insertTask} from './api'
import {Container as TaskContainer, Task, TextStyle as TaskTextStyle} from './Task'
import {useUserId} from './useUserId'

const InsertInput = styled.input`
    width: 100%;
    height: 100%;
    appearance: none;
    border: 0;
    background-color: transparent;
    outline: none;
    -webkit-appearance: textfield;
    ${TaskTextStyle};

    ::-webkit-search-decoration,
    ::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
`

export const Input: React.FC = () => {
    const [label, setLabel] = useState('')
    const userId = useUserId()

    return (
        <TaskContainer>
            <InsertInput
                placeholder="Insert a new task..."
                type="search"
                autoComplete="off"
                value={label}
                onChange={({currentTarget}) => {
                    setLabel(currentTarget.value)
                }}
                onKeyUp={async ({keyCode}) => {
                    if (keyCode === 13) {
                        try {
                            const newTask = await insertTask({label, userId})
                            await mutate(`/tasks/?userId=${userId}`, (tasks: Task[]) => [...tasks, newTask], false)
                            setLabel('')
                        } catch (error) {
                            console.log('errr', error)
                        }
                    }
                }}
            />
        </TaskContainer>
    )
}
