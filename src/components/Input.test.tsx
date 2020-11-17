import React from 'react'
import {fireEvent, render, wait} from '@testing-library/react'
import {GlobalWrapper} from '../testUtils'
import {Input} from './Input'
import userEvent from '@testing-library/user-event'

it('disables the input while submitting', async () => {
    const {getByTestId} = render(<Input />, {wrapper: GlobalWrapper})

    userEvent.type(getByTestId('input'), 'Test')
    fireEvent.keyUp(getByTestId('input'), {keyCode: 13})

    await wait(() => expect(getByTestId('input')).toBeDisabled())
})

it('clears the input after the task has been inserted', async () => {
    const {getByTestId} = render(<Input />, {wrapper: GlobalWrapper})

    userEvent.type(getByTestId('input'), 'Test')
    fireEvent.keyUp(getByTestId('input'), {keyCode: 13})

    await wait(() => expect(getByTestId('input')).toHaveValue(''))
    expect(getByTestId('input')).not.toBeDisabled()
})
