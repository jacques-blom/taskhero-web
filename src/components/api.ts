import {fetcherFn} from 'swr/dist/types'
import {Task} from './Task'

type InsertTask = Pick<Task, 'label'>

export const getApiUrl = (path: string) => {
    return `${process.env.REACT_APP_API_BASE}${path}`
}

export const fetcher = async (url: string) => {
    const res = await fetch(getApiUrl(url))

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const errorJSON = await res.json()
        const error = new Error(errorJSON?.errorMessage || 'Unknown error')
        throw error
    }

    return res.json()
}

export const insertTask = (task: InsertTask) => {
    return fetch(getApiUrl('/tasks'), {method: 'POST', body: JSON.stringify(task)}).then((res) => res.json())
}
