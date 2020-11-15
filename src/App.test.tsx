import React from 'react'
import {render, waitForElementToBeRemoved} from '@testing-library/react'
import App from './App'
import {DarkModeProvider} from './components/useDarkMode'
import {server} from './mocks/server'
import {rest} from 'msw'
import {SWRConfig} from 'swr'
import {fetcher, getApiUrl} from './components/api'
import {UserIdProvider} from './components/useUserId'

const Wrapper: React.FC = ({children}) => {
    return (
        <DarkModeProvider>
            <UserIdProvider>
                <SWRConfig value={{dedupingInterval: 0, fetcher: fetcher, shouldRetryOnError: false}}>
                    {children}
                </SWRConfig>
            </UserIdProvider>
        </DarkModeProvider>
    )
}

it('handles the loading state', async () => {
    const {getByTestId} = render(<App />, {wrapper: Wrapper})
    expect(getByTestId('loading')).toBeInTheDocument()
    await waitForElementToBeRemoved(() => getByTestId('loading'))
})

it('handles the error state', async () => {
    server.use(
        rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Internal server error',
                }),
            )
        }),
    )

    const {findByTestId} = render(<App />, {wrapper: Wrapper})
    expect(await findByTestId('error')).toBeInTheDocument()
})

it('displays a list of todos', async () => {
    const {findByTestId} = render(<App />, {wrapper: Wrapper})
    expect(await findByTestId('task-1')).toBeInTheDocument()
})

it('displays a message if there are no tasks', async () => {
    server.use(
        rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
            return res(ctx.status(200), ctx.json([]))
        }),
    )

    const {findByTestId} = render(<App />, {wrapper: Wrapper})
    expect(await findByTestId('notasks')).toBeInTheDocument()
})
