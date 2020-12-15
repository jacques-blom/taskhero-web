import {rest} from 'msw'
import {getApiUrl} from '../components/api'

export const handlers = [
    rest.get(getApiUrl('/tasks'), (req, res, ctx) => {
        return res(ctx.json([]))
    }),
]
