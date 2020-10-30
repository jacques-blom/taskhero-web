import React from 'react'
import {Input} from './components/Input'
import {ThemeProvider, GlobalStyles, Page} from './components/theme'
import {Header} from './components/Header'
import {useDarkMode} from './components/useDarkMode'
import {useFetch} from 'use-http'
import {Task} from './components/Task'

const Home = () => {
    const {loading, error, data = []} = useFetch<Task[]>('http://localhost:8080/tasks', {}, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <Page>
            <Header />
            {[].map((task: any) => (
                <Task key={task.id} task={task} />
            ))}
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
