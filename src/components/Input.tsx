import React, {useState} from 'react'
import styled from 'styled-components'
import useFetch from 'use-http'
import {Container as TaskContainer, TextStyle as TaskTextStyle} from './Task'

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
    const [loading, setLoading] = useState(false)

    const {post, response} = useFetch('http://localhost:8080/tasks', {
        onError: ({error}) => {
            console.log(error)
        },
    })

    console.log({loading})

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
                        setLoading(true)
                        await post({label})
                        if (response.ok) {
                            setLabel('')
                        }
                        setLoading(false)
                    }
                }}
            />
        </TaskContainer>
    )
}
