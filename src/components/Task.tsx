import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import checkIconSvg from './check.svg'
import {Card} from './Card'
import {updateTask} from './api'
import {useUserId} from './useUserId'

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
    cursor: pointer;

    ${(props) =>
        props.checked &&
        css`
            background-color: transparent;
        `}
`

export const Container = styled(Card)<{isLoading?: boolean}>`
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    ${(props) =>
        props.isLoading &&
        css`
            pointer-events: none;
            opacity: 0.5;

            ${Check} {
                cursor: initial;
            }
        `}
`

const CheckIcon = styled.img`
    transition: 0.1s opacity ease-in-out;
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

    return (
        <Container
            onClick={async () => {
                if (!userId) return

                setLoading(true)

                try {
                    await updateTask({
                        userId,
                        id: task.id,
                        completed: !task.completed,
                    })
                } catch (error) {
                    console.log(error)
                }

                setLoading(false)
            }}
            data-testid={testId}
            isLoading={loading}
        >
            <Check checked={task.completed}>
                <CheckIcon data-testid="checkIcon" src={checkIconSvg} style={{opacity: task.completed ? 1 : 0}} />
            </Check>
            <Label data-testid="label">
                {task.label}
                <Strikethrough checked={task.completed} />
            </Label>
        </Container>
    )
}
