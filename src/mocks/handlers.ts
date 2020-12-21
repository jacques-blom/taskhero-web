import {rest} from 'msw'
import {v4} from 'uuid'
import {getApiUrl} from '../components/api'

export const singleTask = rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
    return res(
        ctx.json([
            {
                id: v4(),
                label: 'Example',
                completed: false,
            },
        ]),
    )
})

export const handlers = [
    rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
        return res(ctx.json([]))
    }),

    rest.post(getApiUrl('/tasks'), (req, res, ctx) => {
        // Make sure we receive a request body as a string
        if (typeof req.body !== 'string') throw new Error('Missing request body')

        // Parse the request body
        const newTask = JSON.parse(req.body)

        // Emulate our real API's behaviour by throwing if we don't receive a label
        if (newTask.label.length === 0) {
            return res(ctx.status(400), ctx.json({message: 'Missing label'}))
        }

        // Emulate our real API's behaviour by responding with the new full task object
        return res(
            ctx.json({
                id: v4(),
                label: newTask.label,
                completed: false,
            }),
        )
    }),

    rest.post(getApiUrl('/task/:id'), (req, res, ctx) => {
        // Make sure we receive a request body as a string
        if (typeof req.body !== 'string') throw new Error('Missing request body')

        // Parse the request body
        const newTask = JSON.parse(req.body)

        // Get the task ID from the route parameter
        const taskId = req.params.id

        // Emulate our real API's behaviour by responding with the updated task object
        return res(
            ctx.json({
                id: taskId,
                label: 'Example',
                completed: newTask.completed,
            }),
        )
    }),
]
