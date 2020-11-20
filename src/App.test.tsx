import {fireEvent, render, wait, waitForElementToBeRemoved, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import React from 'react'
import App from './App'
import {getApiUrl} from './components/api'
import {Task} from './components/Task'
import {server} from './mocks/server'
import {GlobalWrapper} from './testUtils'

describe('tasks list', () => {
    it('handles the loading state', async () => {
        const {getByTestId} = render(<App />, {wrapper: GlobalWrapper})
        expect(getByTestId('loading')).toBeInTheDocument()
        await waitForElementToBeRemoved(() => getByTestId('loading'))
    })

    it('handles the error state', async () => {
        server.use(
            rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
                return res(ctx.status(403), ctx.json({message: 'Internal server error'}))
            }),
        )

        const {findByTestId, getByTestId} = render(<App />, {wrapper: GlobalWrapper})
        expect(await findByTestId('error')).toBeInTheDocument()
        expect(getByTestId('errorMessage')).toHaveTextContent('Internal server error')
    })

    it('displays a list of todos', async () => {
        const {findByTestId} = render(<App />, {wrapper: GlobalWrapper})
        expect(await findByTestId('task-1')).toBeInTheDocument()
    })

    it('displays a message if there are no tasks', async () => {
        server.use(
            rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
                return res(ctx.status(200), ctx.json([]))
            }),
        )

        const {findByTestId} = render(<App />, {wrapper: GlobalWrapper})
        expect(await findByTestId('notasks')).toBeInTheDocument()
    })
})

describe('updating tasks', () => {
    it('marks a not-completed task as completed on click', async () => {
        const {queryAllByTestId, getByTestId} = render(<App />, {
            wrapper: GlobalWrapper,
        })

        await waitForElementToBeRemoved(() => getByTestId('loading'))

        userEvent.click(queryAllByTestId(/^task-/)[0])

        await wait(() => expect(queryAllByTestId('checkIcon')[0]).toHaveStyle('opacity: 1;'))
    })

    it('marks a completed task as not completed on click', async () => {
        server.use(
            rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
                return res(
                    ctx.json<Task[]>([{id: '1', label: 'Task 1', completed: true, userId: '1'}]),
                )
            }),
        )

        const {getByTestId} = render(<App />, {
            wrapper: GlobalWrapper,
        })

        await waitForElementToBeRemoved(() => getByTestId('loading'))

        userEvent.click(getByTestId('task-1'))

        await wait(() => expect(getByTestId('checkIcon')).toHaveStyle('opacity: 1;'))
    })

    it('handles errors when marking a task as (un)completed', async () => {
        server.use(
            rest.post(getApiUrl('/task/:id'), (req, res, ctx) => {
                return res(ctx.status(403), ctx.json({message: 'Internal server error'}))
            }),
        )

        const {getByTestId, getByRole} = render(<App />, {
            wrapper: GlobalWrapper,
        })

        await waitForElementToBeRemoved(() => getByTestId('loading'))

        userEvent.click(getByTestId('task-1'))

        await wait(() => expect(getByRole('alert')).toBeInTheDocument())
        expect(getByRole('alert')).toHaveTextContent('Internal server error')
    })
})

describe('inserting tasks', () => {
    it('inserts a new task', async () => {
        const {getByTestId} = render(<App />, {
            wrapper: GlobalWrapper,
        })

        await waitForElementToBeRemoved(() => getByTestId('loading'))

        userEvent.type(getByTestId('input'), 'Test')
        fireEvent.keyUp(getByTestId('input'), {keyCode: 13})

        await wait(() => expect(getByTestId('task-3')).toBeInTheDocument())

        const task3 = within(getByTestId('task-3'))
        expect(task3.getByTestId('label')).toHaveTextContent('Test')
    })

    it('handles errors when inserting a task', async () => {
        const {getByTestId, getByRole} = render(<App />, {
            wrapper: GlobalWrapper,
        })

        await waitForElementToBeRemoved(() => getByTestId('loading'))

        userEvent.type(getByTestId('input'), '')
        fireEvent.keyUp(getByTestId('input'), {keyCode: 13})

        await wait(() => expect(getByRole('alert')).toBeInTheDocument())
        expect(getByRole('alert')).toHaveTextContent('Missing label')
    })
})
