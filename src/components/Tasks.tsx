import React, {useState} from 'react'
import {Task} from './Task'

type Task = {
    id: number
    label: string
    complete: boolean
}

export const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    return (
        <div>
            {tasks.map((task) => (
                <Task {...task} key={task.id} />
            ))}
        </div>
    )
}
