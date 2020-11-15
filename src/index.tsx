import React from 'react'
import ReactDOM from 'react-dom'
import {SWRConfig} from 'swr'
import App from './App'
import {fetcher} from './components/api'
import {DarkModeProvider} from './components/useDarkMode'
import {UserIdProvider} from './components/useUserId'

// if (process.env.NODE_ENV === 'development') {
//     const {worker} = require('./mocks/browser')
//     worker.start()
// }

ReactDOM.render(
    <React.StrictMode>
        <DarkModeProvider>
            <SWRConfig value={{fetcher}}>
                <UserIdProvider>
                    <App />
                </UserIdProvider>
            </SWRConfig>
        </DarkModeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
