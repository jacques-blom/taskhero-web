import React, {useState} from 'react'
import {toast} from 'react-toastify'
import styled from 'styled-components'
import {insertTask} from './api'
import {card} from './Card'
import {TextStyle as TaskTextStyle} from './Task'
import {useUserId} from './useUserId'

const Container = styled.div`
    ${card}
`

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
    const userId = useUserId()

    return (
        <Container data-testid="container" disabled={loading}>
            <InsertInput
                placeholder="Insert a new task..."
                type="text"
                autoComplete="off"
                value={label}
                disabled={loading}
                aria-label="Insert new task"
                onChange={({currentTarget}) => {
                    setLabel(currentTarget.value)
                }}
                onKeyUp={async ({keyCode}) => {
                    if (keyCode === 13 && userId) {
                        setLoading(true)

                        try {
                            await insertTask({label, userId})
                            setLabel('')
                        } catch (error) {
                            toast.error(error.message, {toastId: 'insertError', autoClose: false})
                        }

                        setLoading(false)
                    }
                }}
            />
        </Container>
    )
}
