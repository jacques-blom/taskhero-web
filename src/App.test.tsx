import React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import App from './App'
import {GlobalWrapper} from './testUtils'
import {server} from './mocks/server'
import {rest} from 'msw'
import {getApiUrl} from './components/api'

it('shows the loading spinner while data is loading', () => {
    render(<App />, {wrapper: GlobalWrapper})
    expect(screen.getByRole('alert', {name: 'loading'})).toBeInTheDocument()
})

it('shows an alert if there are no tasks', async () => {
    render(<App />, {wrapper: GlobalWrapper})
    await waitForElementToBeRemoved(() => screen.getByRole('alert', {name: 'loading'}))
    expect(screen.getByRole('heading', {name: /No tasks yet/i})).toBeInTheDocument()
})

it('shows an error message if the API returns an error', async () => {
    server.use(
        rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({message: 'Internal server error'}))
        }),
    )

    render(<App />, {wrapper: GlobalWrapper})
    await waitForElementToBeRemoved(() => screen.getByRole('alert', {name: 'loading'}))
    expect(screen.getByRole('heading', {name: /error/i})).toBeInTheDocument()
    expect(screen.getByRole('alert', {name: /internal server error/i})).toBeInTheDocument()
})
