import {mutate} from 'swr'
import {Task} from './Task'

export const getApiUrl = (path: string) => {
    return `https://mqdyjsm1xd.execute-api.us-east-1.amazonaws.com/dev${path}`
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

type InsertTask = Pick<Task, 'label' | 'userId'>

export const insertTask = async (task: InsertTask) => {
    const response = await fetch(getApiUrl('/tasks'), {method: 'POST', body: JSON.stringify(task)})
    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message)
    }

    await mutate(`/tasks/?userId=${task.userId}`, (tasks: Task[] = []) => [...tasks, json], false)
}

type UpdateTask = Pick<Task, 'completed' | 'id' | 'userId'>

export const updateTask = async (task: UpdateTask) => {
    const updatedTask = await fetch(getApiUrl(`/task/${task.id}`), {
        method: 'POST',
        body: JSON.stringify(task),
    }).then((res) => res.json())

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
