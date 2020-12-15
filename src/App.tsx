import React from 'react'
import useSWR from 'swr'
import {ErrorPage} from './components/ErrorPage'
import {Input} from './components/Input'
import {LoadingPage} from './components/LoadingPage'
import {Page} from './components/Page'
import {Subheading} from './components/Subheading'
import {Task} from './components/Task'
import {GlobalStyles, ThemeProvider} from './components/theme'
import {useDarkMode} from './components/useDarkMode'
import {useUserId} from './components/useUserId'

const Home = () => {
    const userId = useUserId()
    const {data, error} = useSWR<Task[]>(`/tasks/?userId=${userId}`)

    if (error) return <ErrorPage message={error.message} />
    if (!data) return <LoadingPage />

    return (
        <Page>
            {data.length === 0 ? (
                <Subheading>No tasks yet</Subheading>
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
