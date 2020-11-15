import React from 'react'
import {Input} from './components/Input'
import {ThemeProvider, GlobalStyles, Page} from './components/theme'
import {Header} from './components/Header'
import {useDarkMode} from './components/useDarkMode'
import {Task} from './components/Task'
import useSWR from 'swr'
import {useUserId} from './components/useUserId'

const Home = () => {
    const userId = useUserId()
    const {error, data} = useSWR<Task[]>(`/tasks/?userId=${userId}`)

    if (error) return <div data-testid="error">Error: {error.message}</div>
    if (!data) return <div data-testid="loading">Loading...</div>

    return (
        <Page>
            <Header />
            {data.length === 0 ? (
                <div data-testid="notasks">No Tasks Yet</div>
            ) : (
                data.map((task) => {
                    return <Task testId={`task-${task.id}`} key={task.id} task={task} />
                })
            )}
            <Input />
        </Page>
    )
}

const App = () => {
    const [darkMode] = useDarkMode()

    return (
        <ThemeProvider darkMode={darkMode}>
            <GlobalStyles />
            <Home />
        </ThemeProvider>
    )
}

export default App
