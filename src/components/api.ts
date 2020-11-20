import {mutate} from 'swr'
import {Task} from './Task'

export const getApiUrl = (path: string) => {
    return `https://mqdyjsm1xd.execute-api.us-east-1.amazonaws.com/dev${path}`
}

const customFetch = async (url: string, options?: RequestInit) => {
    const res = await fetch(url, options)
    const json = await res.json()

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error(json?.message || 'Unknown error')
        throw error
    }

    return json
}

export const fetcher = (url: string) => customFetch(getApiUrl(url))

const post = async (url: string, {body}: {body: object}) => {
    return customFetch(url, {method: 'POST', body: JSON.stringify(body)})
}

type InsertTask = Pick<Task, 'label' | 'userId'>

export const insertTask = async (task: InsertTask) => {
    const newTask = await post(getApiUrl('/tasks'), {body: task})
    await mutate(`/tasks/?userId=${task.userId}`, (tasks: Task[] = []) => [...tasks, newTask], false)
}

type UpdateTask = Pick<Task, 'completed' | 'id' | 'userId'>

export const updateTask = async (task: UpdateTask) => {
    const updatedTask = await post(getApiUrl(`/task/${task.id}`), {body: task})

    await mutate(
        `/tasks/?userId=${task.userId}`,
        (tasks: Task[] = []) => {
            return tasks.map((t) => {
                if (t.id === task.id) return updatedTask
                return t
            })
        },
        false,
    )
}
