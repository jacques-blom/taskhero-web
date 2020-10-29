import React from 'react'
import {Input} from './components/Input'
import {Tasks} from './components/Tasks'
import {ThemeProvider, GlobalStyles, Page} from './components/theme'
import {Header} from './components/Header'

const Home = () => {
    return (
        <Page>
            <Header />
            <Tasks />
            <Input />
        </Page>
    )
}

const App = () => {
    const darkMode = true
    return (
        <ThemeProvider darkMode={darkMode}>
            <GlobalStyles />
            <Home />
        </ThemeProvider>
    )
}

export default App
