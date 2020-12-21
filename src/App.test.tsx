import React from 'react'
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import App from './App'
import {GlobalWrapper} from './testUtils'
import {server} from './mocks/server'
import {rest} from 'msw'
import {getApiUrl} from './components/api'
import userEvent from '@testing-library/user-event'
import {singleTask} from './mocks/handlers'

const waitForLoading = () => {
    return waitForElementToBeRemoved(() => screen.getByRole('alert', {name: 'loading'}))
}

it('shows the loading spinner while data is loading', () => {
    render(<App />, {wrapper: GlobalWrapper})
    expect(screen.getByRole('alert', {name: 'loading'})).toBeInTheDocument()
})

it('shows an alert if there are no tasks', async () => {
    render(<App />, {wrapper: GlobalWrapper})
    await waitForLoading()
    expect(screen.getByRole('heading', {name: /No tasks yet/i})).toBeInTheDocument()
})

it('shows an error message if the API returns an error', async () => {
    server.use(
        rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({message: 'Internal server error'}))
        }),
    )

    render(<App />, {wrapper: GlobalWrapper})
    await waitForLoading()
    expect(screen.getByRole('heading', {name: /error/i})).toBeInTheDocument()
    expect(screen.getByRole('alert', {name: /internal server error/i})).toBeInTheDocument()
})

it('inserts a new task', async () => {
    render(<App />, {wrapper: GlobalWrapper})
    await waitForLoading()

    const insertInput = screen.getByRole('textbox', {name: /insert/i})

    // Type a task and press enter
    userEvent.type(insertInput, 'New task')
    fireEvent.keyUp(insertInput, {keyCode: 13})

    // Test the loading state
    expect(insertInput).toBeDisabled()

    // Test the success state
    await waitFor(() => expect(insertInput).not.toBeDisabled())
    expect(insertInput).toHaveValue('')

    // Test whether the task is displaying on the page
    expect(screen.getByTestId(/task-/)).toHaveTextContent('New task')
})

it('displays an error message if the API fails', async () => {
    render(<App />, {wrapper: GlobalWrapper})
    await waitForLoading()

    const insertInput = screen.getByRole('textbox', {name: /insert/i})

    // Just press enter without typing a label
    fireEvent.keyUp(insertInput, {keyCode: 13})

    // Wait for loading to complete
    await waitFor(() => expect(insertInput).not.toBeDisabled())

    // Expect an error alert to display
    expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(`"Missing label"`)
})

it('toggles the task completed state', async () => {
    // Mock a single task on the page
    server.use(singleTask)

    render(<App />, {wrapper: GlobalWrapper})
    await waitForLoading()

    // Click the checkbox
    userEvent.click(screen.getByRole('checkbox', {name: /mark as completed/}))

    // Expect it to be disabled while loading
    expect(screen.getByRole('checkbox')).toBeDisabled()

    // Wait for the checkbox to be checked
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked())

    // Click the now-checked checkbox
    userEvent.click(screen.getByRole('checkbox', {name: /mark as uncompleted/}))

    // Wait for the checkbox to be unchecked
    await waitFor(() => expect(screen.getByRole('checkbox')).not.toBeChecked())
})

it('handles toggling the completed state failing', async () => {
    // Display a single task again
    server.use(singleTask)

    // Return an error response from the API when we try to call this endpoint
    server.use(
        rest.post(getApiUrl('/task/:id'), (req, res, ctx) =>
            res(ctx.status(500), ctx.json({message: 'Something went wrong'})),
        ),
    )

    render(<App />, {wrapper: GlobalWrapper})
    await waitForLoading()

    // Click the checkbox
    userEvent.click(screen.getByRole('checkbox', {name: /mark as completed/}))

    // Expect the error to display once loading has completed
    await waitFor(() => {
        return expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(`"Something went wrong"`)
    })

    // Make sure the checkbox stays unchecked
    expect(screen.getByRole('checkbox')).not.toBeChecked()
})
