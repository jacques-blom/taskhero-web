import React, {useState} from 'react'
import styled from 'styled-components'
import {mutate} from 'swr'
import {insertTask} from './api'
import {Container as TaskContainer, Task, TextStyle as TaskTextStyle} from './Task'

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
                            const newTask = await insertTask({label})
                            await mutate('/tasks', (tasks: Task[]) => [...tasks, newTask], false)
                            setLabel('')
                        } catch (error) {}
                    }
                }}
            />
        </TaskContainer>
    )
}
