import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import checkIconSvg from './check.svg'
import {card} from './Card'
import {updateTask} from './api'
import {useUserId} from './useUserId'
import {toast} from 'react-toastify'

export const TextStyle = css`
    font-size: 17px;
    color: ${(props) => props.theme.text};
    font-family: inherit;
`

const Check = styled.div<{checked: boolean}>`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-right: 15px;
    transition: 0.2s all ease-in-out;
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: ${(props) => props.theme.background};
    box-sizing: border-box;
    border: 1px solid transparent;

    ${(props) =>
        props.checked &&
        css`
            background-color: transparent;
        `}
`

const HTMLCheckbox = styled.input`
    :focus + ${Check} {
        box-shadow: 0 0 0 1px #00e0e6;
    }
`

export const Container = styled.div`
    ${card}
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    cursor: pointer;

    ${(props) =>
        props.disabled &&
        css`
            ${Check} {
                cursor: initial;
            }
        `}
`

const CheckIcon = styled.img`
    transition: 0.1s opacity ease-in-out;
    width: 12px;
`

const Label = styled.div`
    position: relative;
    ${TextStyle}
`

const Strikethrough = styled.div<{checked: boolean}>`
    position: absolute;
    top: 50%;
    left: -3px;
    right: -3px;
    height: 2px;
    background-color: ${(props) => props.theme.text};
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: center left;
    transition: 0.1s all ease-in-out;

    ${(props) =>
        props.checked &&
        css`
            transform: scaleX(1);
        `};
`

export type Task = {
    id: string
    label: string
    completed: boolean
    userId: string
}

export const Task: React.FC<{task: Task; testId: string}> = ({task, testId}) => {
    const [loading, setLoading] = useState(false)
    const userId = useUserId()

    const updateCompleted = async (completed: boolean) => {
        if (!userId) return

        setLoading(true)

        try {
            await updateTask({
                userId,
                id: task.id,
                completed,
            })
        } catch (error) {
            toast.error(error.message)
        }

        setLoading(false)
    }

    return (
        <Container data-testid={testId} disabled={loading}>
            <label style={{position: 'relative'}}>
                <HTMLCheckbox
                    type="checkbox"
                    checked={task.completed}
                    onChange={(event) => updateCompleted(event.target.checked)}
                    style={{opacity: 0, position: 'absolute'}}
                    aria-label={task.completed ? 'mark as uncompleted' : 'mark as completed'}
                    disabled={loading}
                />
                <Check checked={task.completed}>
                    <CheckIcon data-testid="checkIcon" src={checkIconSvg} style={{opacity: task.completed ? 1 : 0}} />
                </Check>
            </label>
            <Label data-testid="label">
                {task.label}
                <Strikethrough checked={task.completed} />
            </Label>
        </Container>
    )
}
