import {rest} from 'msw'
import {getApiUrl} from '../components/api'
import {Task} from '../components/Task'

export const handlers = [
    rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json<Task[]>([
                {id: 1, label: 'Completed task', completed: true},
                {id: 2, label: 'Uncompleted task', completed: false},
            ]),
        )
    }),

    rest.post(getApiUrl('/tasks'), (req, res, ctx) => {
        if (typeof req.body !== 'string') throw new Error('No task specified')
        const newTask = JSON.parse(req.body)

        return res(ctx.status(200), ctx.json({id: 3, label: newTask.label, completed: false}))
    }),
]
