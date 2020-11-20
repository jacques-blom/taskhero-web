import {rest} from 'msw'
import {getApiUrl} from '../components/api'
import {Task} from '../components/Task'

export const handlers = [
    rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
        return res(
            ctx.json<Task[]>([
                {id: '1', label: 'Task 1', completed: false, userId: '1'},
                {id: '2', label: 'Task 2', completed: false, userId: '1'},
            ]),
        )
    }),

    rest.post(getApiUrl('/tasks'), (req, res, ctx) => {
        if (typeof req.body !== 'string') throw new Error('Missing request body')

        const newTask = JSON.parse(req.body)

        if (newTask.label.length === 0) {
            return res(ctx.status(400), ctx.json({message: 'Missing label'}))
        }

        return res(ctx.status(200), ctx.json({id: '3', label: newTask.label, completed: false}))
    }),

    rest.post(getApiUrl('/task/:id'), (req, res, ctx) => {
        if (typeof req.body !== 'string') throw new Error('Invalid body')

        const updatedTask = JSON.parse(req.body)

        return res(ctx.json({id: '1', label: 'Test', completed: updatedTask.completed}))
    }),
]
