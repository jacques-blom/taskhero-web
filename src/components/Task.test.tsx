import React from 'react'
import {render} from '@testing-library/react'
import {Task} from './Task'
import {GlobalWrapper} from '../testUtils'

const mockTask = {
    id: '1',
    label: 'Hello',
    completed: false,
    userId: '1',
}

it('displays the task label', () => {
    const {getByTestId} = render(<Task testId="task" task={mockTask} />, {
        wrapper: GlobalWrapper,
    })

    expect(getByTestId('label')).toHaveTextContent('Hello')
})
