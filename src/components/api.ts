import {mutate} from 'swr'
import {Task} from './Task'

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

type InsertTask = Pick<Task, 'label'> & {userId: string}

export const insertTask = async (task: InsertTask) => {
    const newTask = await fetch(getApiUrl('/tasks'), {method: 'POST', body: JSON.stringify(task)}).then((res) =>
        res.json(),
    )
    await mutate(`/tasks/?userId=${task.userId}`, (tasks: Task[]) => [...tasks, newTask], false)
}

type UpdateTask = Pick<Task, 'completed' | 'id'> & {userId: string}

export const updateTask = async (task: UpdateTask) => {
    const updatedTask = await fetch(getApiUrl(`/task/${task.id}`), {
        method: 'POST',
        body: JSON.stringify(task),
    }).then((res) => res.json())

    await mutate(
        `/tasks/?userId=${task.userId}`,
        (tasks: Task[]) => {
            return tasks.map((t) => {
                if (t.id === task.id) return updatedTask
                return t
            })
        },
        false,
    )
}
